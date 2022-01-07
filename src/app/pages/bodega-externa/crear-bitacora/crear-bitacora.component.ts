import { Component, OnInit } from '@angular/core';
import { Productor } from 'src/app/models/productor';
import { ProductoresService } from '../../../services/productores/productores.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodegaExternaService } from '../../../services/bodegaExterna/bodega-externa.service';
import { Router } from '@angular/router';
import { SolicitarConfirmacion } from 'src/app/components/informationAlert';

@Component({
  selector: 'app-crear-bitacora',
  templateUrl: './crear-bitacora.component.html',
  styleUrls: ['./crear-bitacora.component.scss'],
})
export class CrearBitacoraComponent implements OnInit {
  public productores: Productor[] = [];
  public tiposPitajaya: string[] = ['Yellow Dragon Fruit', 'Red Dragon Fruit'];

  public bitacoraForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private productoresService: ProductoresService,
    private bodegaExternaService: BodegaExternaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarProductores();
    this.bitacoraForm = this.fb.group({
      productor: [' ', Validators.required],
      pitajaya: [' ', Validators.required],
      gavetas: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ],
      ],
    });
  }
/**
 * carga los productores activos 
 */
  cargarProductores() {
    this.productoresService.cargarProductores().subscribe((resp: any) => {
      this.productores = resp;
    });
  }

  /**
   * guarda los datos generados en la bitacora
   */
  async guardar(): Promise<any> {
    if (this.bitacoraForm.valid) {
      const data = {
        num_gavetas: this.bitacoraForm.get('gavetas')?.value,
        estado: 'Bodega',
        tipo_pitahaya: this.bitacoraForm.get('pitajaya')?.value,
        id_productor: this.bitacoraForm.get('productor')?.value.id_productor,
        id_usuario: 1,
      };
      const confirmacion = await SolicitarConfirmacion(
        '¿Desea continuar con el registro de la bitácora?'
      );
      if (confirmacion) {
        Swal.fire({
          title: 'Guardando bitácora...',
          didOpen: () => {
            Swal.showLoading();
          },
        });
        this.bodegaExternaService.crearBitacora(data).subscribe(
          (resp: any) => {
            Swal.close();
            Swal.fire(
              'Listo',
              'Los Datos de la Bitacora se Guardaron Exitosamente',
              'success'
            );
            this.router.navigateByUrl('/bodega/ver-bitacoras');
          },
          (error) => {
            Swal.close();
            Swal.fire(
              'Error al guardar los datos',
              'Sucedio un error inesperado, vuelva a intentarlo',
              'error'
            );
          }
        );
      }
    }
  }
}
