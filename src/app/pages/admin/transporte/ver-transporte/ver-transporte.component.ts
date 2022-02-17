import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransportesService } from '../../../../services/transporte/transportes.service';
import { Transporte } from '../../../../models/transporte';
import { recepcionTransporte } from '../../../../interfaces/recepcionTransporte';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import * as reporteRecepcion from 'src/app/reports/estructuraRecepcion';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ver-transporte',
  templateUrl: './ver-transporte.component.html',
  styleUrls: ['./ver-transporte.component.scss']
})
export class VerTransporteComponent implements OnInit {

  //datos del transportista
  public id_transporte : number = 0
  public transporte!: Transporte;
  

  // varibles generales de la pestaña
  public cargando: boolean = true;
  public isVisible: boolean = false;
  public tipoIcon: string = '';
  public color: string = '';
  public dateFormat = 'MM/dd/yyyy';
  public rangofechas:Date[]  = [] ;
  public bitacoras:recepcionTransporte[] = [];

  constructor(private rutaActiva:ActivatedRoute,
              private transporteService: TransportesService ) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(({ id }) => {
      this.cargarTransporte(id);
      this.id_transporte = id
    });
  }

  cargarTransporte(id_transporte: number){
      this.transporteService.getTransportesbyId(id_transporte).subscribe(
        (transporte:any)=>{
            this.transporte = transporte
        if (this.transporte.activo === true) {
          this.color = '#52c41a';
          this.tipoIcon = 'check-circle';
        } else {
          this.color = 'red';
          this.tipoIcon = 'close-circle';
        }
        this.cargando = false;
        this.cargarBitacoras()
        
        }
      )
  }

  cargarBitacoras(){
    this.transporteService.ObtenerRecepciones(this.id_transporte).subscribe(
      (resp:any)=>{
       
        this.bitacoras = resp
      }
    )
  }

   /**
   * filtra por fechas las recepciones del transportista
   * 
   */
    onChange(result: Date[]){
      let recepcionesFiltradas:any[] = [];
        if (result.length !== 0){
          this.bitacoras.forEach(element => {
            let fechaRecepcion : Date = new Date(element.fecha)
                if (fechaRecepcion.getTime() >= this.rangofechas[0].getTime() && fechaRecepcion.getTime() <= this.rangofechas[1].getTime() ) {
                  recepcionesFiltradas.push(element)
                }
            });
            this.bitacoras = recepcionesFiltradas
        }else{
          this.cargarBitacoras();
        }
      }


   delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      /**
   * Descarga el reporte de la bitacora de recepcion
   * @param recepcion datos para generar el reporte
   */

   async verReporte(recepcion: recepcionTransporte){

    Swal.fire({
      title: 'Generando reporte de Control de calidad...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    await this.delay(1500);
    let docDefinition: any = await {
      pageSize: 'A4',
      pageOrientation: 'portrait',
      content: [
        {
          stack: [
            reporteRecepcion.HeaderControl(),
            reporteRecepcion.DetailControl(recepcion),
            reporteRecepcion.productores(recepcion),
            reporteRecepcion.LoadImages(recepcion)
        
            
          ],
          margin: [0, 0, 0, 0],
        },
      ],
    };
    Swal.close();
    pdfMake.createPdf(docDefinition).download('BitacoraTransporte.pdf');

  }

}
