import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bodegaExterna } from 'src/app/interfaces/bodegaExterna';
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
      if(this.listOfData.length>0){
         this.idProductor = this.listOfData[0].id_productor.id_productor;
      }
      
      this.cargando = false
      
    });
  }
/**
 * maneja a redireccion hacia editar o crear un nuevo calibre
 * @param data el id de la bodega para el calibrado
 * @param action crear o editar
 */
  goCalibre(data: number, action: string) {
    if (action == 'crear') {
      this.router.navigate(['calibrado/crear-calibrado/'], {
        queryParams: { id_bodega: data },
      });
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
