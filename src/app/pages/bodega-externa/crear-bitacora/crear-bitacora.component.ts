import { Component, OnInit } from '@angular/core';
import { Productor } from 'src/app/models/productor';
import { ProductoresService } from '../../../services/productores/productores.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BodegaExternaService } from '../../../services/bodegaExterna/bodega-externa.service';
import { Router } from '@angular/router';
import { SolicitarConfirmacion } from 'src/app/components/informationAlert';
import { LocalStorageService } from '../../../services/LocalStorage/local-storage.service';
import { Usuario } from '../../../models/usuarios';
import { RecepcionTransService } from '../../../services/recepcion/recepcion-trans.service';
import { recepcionTransporte } from '../../../interfaces/recepcionTransporte';


@Component({
  selector: 'app-crear-bitacora',
  templateUrl: './crear-bitacora.component.html',
  styleUrls: ['./crear-bitacora.component.scss'],
})
export class CrearBitacoraComponent implements OnInit {

  public productores: Productor[] = [];
  public placas: any[] = [];
  public recepciones: recepcionTransporte[] = [];
  public tiposPitajaya: string[] = ['Yellow Dragon Fruit', 'Red Dragon Fruit'];

  public bitacoraForm!: FormGroup;
  public factImg!: File;
  public id_usuario: number = 0

  constructor(
    private fb: FormBuilder,
    private productoresService: ProductoresService,
    private bodegaExternaService: BodegaExternaService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private recepcionTransService: RecepcionTransService
  ) {}

  ngOnInit(): void {
    this.cargarProductores();
    this.bitacoraForm = this.fb.group({
      productor: [null, Validators.required],
      transporte: [null, Validators.required],
      pitajaya: [null, Validators.required],
      gavetas: [
        null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]
      ],
      personal:[null,[ Validators.required,Validators.minLength(1)]],
      kgReportados : [ null, [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(/^(\d*\.)?\d+$/)]],
      kgRecibidos: [ null, [Validators.required,
        Validators.minLength(1),
        Validators.pattern(/^(\d*\.)?\d+$/)]],
    });

    this.cargarIdUsuario();
    this.cargarTransporte();
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
 * get id del usuario 
 */
  cargarIdUsuario(){
     let usuario: Usuario =  this.localStorageService.getUserLocalStorage()
     this.id_usuario = usuario.id
  }

  cargarTransporte(){
    
    this.recepcionTransService.ObtenerRecepciones().subscribe(
      (resp:any)=>{
        this.recepciones = resp
        console.log(resp);
          resp.forEach( (element:recepcionTransporte) => {
            if (element.num_sello_salida  ==="0") {
              this.placas.push(element.id_transporte.placa)
            }
              
          });
      }
    )
  }

  /**
   * controla la seleccion de archivos al control 
   * de calidad
   */
  getImagen( event: any ): void{
    try {
      const file = event.target.files[0];
      this.factImg = file;
      } catch {
        Swal.fire(
          'Debe Seleccionar una Imagen para la Factura',
          '',
          'error'
        );
      }
  }

  /**
   * guarda los datos generados en la bitacora
   */
  async guardar(): Promise<any> {
    
    if (this.bitacoraForm.valid) {

      let dataControl = new FormData();
      dataControl.append('num_gavetas', this.bitacoraForm.get('gavetas')?.value);
      dataControl.append('estado','Bodega');
      dataControl.append('tipo_pitahaya', this.bitacoraForm.get('pitajaya')?.value);
      dataControl.append('personal_descarga', this.bitacoraForm.get('personal')?.value);
      dataControl.append('kg_recibidos', this.bitacoraForm.get('kgRecibidos')?.value);
      dataControl.append('kg_reportados', this.bitacoraForm.get('kgReportados')?.value);
      this.recepciones.forEach(element => {
        if (element.id_transporte.placa === this.bitacoraForm.get('transporte')?.value) {
          dataControl.append("id_recepcion",String(element.id_recepcion_transporte));
        }
      });
      //enviar id productor y usuario
      dataControl.append('id_productor', this.bitacoraForm.get('productor')?.value.id_productor);
      dataControl.append('id_usuario', String(this.id_usuario));
    
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
        // Crear Bitacora
        this.bodegaExternaService.crearBitacora(dataControl).subscribe(
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
