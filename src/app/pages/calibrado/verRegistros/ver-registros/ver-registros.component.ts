import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SolicitarConfirmacion } from 'src/app/components/informationAlert';
import { bodegaExterna } from 'src/app/interfaces/bodegaExterna';
import Swal from 'sweetalert2';
import { CalibradoService } from '../../../../services/calibrado/calibrado.service';

@Component({
  selector: 'app-ver-registros',
  templateUrl: './ver-registros.component.html',
  styleUrls: ['./ver-registros.component.scss'],
})
export class VerRegistrosComponent implements OnInit {
  public listOfData: bodegaExterna[] = [];
  public cargando = true;
  public idProductor = 0 ;
  constructor(
    private calibradoService: CalibradoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }
/**
 * carga la lista de calibres de registros desde la base
 */
  cargarRegistros() {
    this.calibradoService.cargarCalibrado().subscribe((resp: any) => {
      resp.forEach( (calibrado:any) => {
        if (calibrado.estado ==="Bodega" || calibrado.estado ==="Calibrado" ) { 
          this.listOfData.push(calibrado);
        }
      });
      this.cargando = false
      
    },(err)=>{
      Swal.fire('Error', 'Sucedio un error, no se pudo cargar los Calibrados', 'error');
      
    },);
  }
/**
 * maneja a redireccion hacia editar o crear un nuevo calibre
 * @param data el id de la bodega para el calibrado
 * @param action crear o editar
 */
 async goCalibre(data: number, action: string) {

    if (action == 'crear') {
      const confirmacion = await SolicitarConfirmacion(
        'Se verificó el peso recibido y número de gavetas?'
      );
      if (confirmacion) {
        this.router.navigate(['calibrado/crear-calibrado/'], {
          queryParams: { id_bodega: data },
        });
      }

    } else if (action == 'editar') {
      this.router.navigate(['calibrado/crear-calibrado/'], {
        queryParams: { id_bodega: data, is_calibre: true },
      });
    }
  }

  /**
   * redireccion hacia la pestaña de creacion de control de calidad
   * @param data  id del calibrado
   */
  goControl(bodega: number, recepcion:number) {
    this.listOfData.forEach(element => {
      if (element.id_bodega === bodega) {
        this.idProductor = element.id_productor.id_productor
      }
      
    });
    this.router.navigate(['calibrado/control-calidad/'], {
      queryParams: { id_bodega: bodega, id_recepcion: recepcion , id_productor: this.idProductor},
    });
  }
}
