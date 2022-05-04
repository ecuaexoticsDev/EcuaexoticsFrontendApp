import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Productor } from '../../models/productor';
import { ActivatedRoute } from '@angular/router';
import { ProductoresService } from '../../services/productores/productores.service';
import { ControlCalidadService } from '../../services/controlCalidad/control-calidad.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import * as reportControl from 'src/app/reports/estructuraControlCalidad';
import * as reportBitacora from 'src/app/reports/estructuraBitacora';
import pdfMake from 'pdfmake/build/pdfmake';
import { BodegaExternaService } from '../../services/bodegaExterna/bodega-externa.service';


@Component({
  selector: 'app-document-downloads',
  templateUrl: './document-downloads.component.html',
  styleUrls: ['./document-downloads.component.scss']
})
export class DocumentDownloadsComponent implements OnInit {

  public id_productor: number = 0;
  public id_bodega: number = 0;
  public productor!: Productor;
  public cargando = false;
  public  bitacora:any ;
  


  constructor(
    private rutaActiva: ActivatedRoute,
    private productoresService: ProductoresService,
    private cdref: ChangeDetectorRef,
    private controlService: ControlCalidadService,
    private bodegaService: BodegaExternaService
  ) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(({ idProductor,idBodega }) => {
      this.getProductor(idProductor);
      this.id_bodega = idBodega
      this.getBodegaById(idProductor,idBodega)
    });
    
    
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  /**
   * obtiene el productor para cargar los datos en su perfil
   * @param id_productor id del productor en la base
   */
   getProductor(id_productor: number) {
    this.cargando = true;
    this.productoresService
      .getProductorByid(id_productor)
      .subscribe((productor: any) => {
        this.productor = productor;
       
      });
      this.cargando = false;
  }

  download(){
    this.verReporte(this.id_bodega)
  }

  downloadBitacora(){
    this.verBitacora(this.id_bodega)
  }

  getBodegaById(productor: number, bodega:number){
    
    this.bodegaService.obtenerBodegabyId(productor,bodega).subscribe(
      (resp:any)=>{
        this.bitacora = resp[0]
      }
    )
  }

    /**
   * Descarga el reporte de control de calidad
   * @param id id del reporte para descargarlo
   */
     async verReporte(id: number) {
      
  
      const productor = this.productor.nombre + ' ' + this.productor.apellido;
      Swal.fire({
        title: 'Generando reporte de Control de calidad...',
        didOpen: () => {
          Swal.showLoading();
        },
      });
    
      this.controlService.getControl(id).subscribe(
        async (control: any) => {  
          await this.delay(1000);
          let docDefinition: any = await {
            pageSize: 'A4',
            pageOrientation: 'portrait',
            content: [
              {
                stack: [
                  reportControl.HeaderControl(),
                  reportControl.DetailControl(control, productor),
                  reportControl.causasRechazo(control),
                  reportControl.infoObservacion(control),
                  reportControl.LoadImages(control),
                 
                ],
                margin: [0, 0, 0, 0],
              },
            ],
          };
          Swal.close();
          pdfMake.createPdf(docDefinition).download('reportControlCalidad.pdf');
        },
        (error) => {
          Swal.close();
          Swal.fire(
            'Error',
            'No ha sido posible genenerar el reporte solicitado',
            'error'
          );
        }
      );
    }

     /**
   * Descarga el Bitacora Digital
   * @param id id de la bitacora para descargarla
   */
  
 async verBitacora(id: number){
  
    const productor = this.productor.nombre + ' ' + this.productor.apellido;
    
    Swal.fire({
      title: 'Generando Bitacora...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.controlService.getControl(id).subscribe(
     
      async(controlCalidad:any)=>{
       
        await this.delay(1000);
        let docDefinition: any = await {
          pageSize: 'A4',
          pageOrientation: 'portrait',
          content: [
            {
              stack: [
                reportBitacora.HeaderControl(),
                reportBitacora.DetailControl(this.bitacora, productor,controlCalidad.gav_vacias,controlCalidad.num_gav_rechazo ),
              ],
              margin: [0, 0, 0, 0],
            },
          ],
        };
        Swal.close();
        pdfMake.createPdf(docDefinition).download('Bitacora.pdf');
      },(error) => {
        Swal.close();
        Swal.fire(
          'Error',
          'No ha sido posible genenerar el reporte solicitado',
          'error'
        );
      }
    )
  }

}
