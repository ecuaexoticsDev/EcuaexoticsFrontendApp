import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Productor } from 'src/app/models/productor';
import { ProductoresService } from '../../../../services/productores/productores.service';
import { BodegaExternaService } from '../../../../services/bodegaExterna/bodega-externa.service';
import Swal from 'sweetalert2';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as reportStrcuture from 'src/app/reports/estructuraLiquidacion';
import * as reportControl from 'src/app/reports/estructuraControlCalidad';
import * as reportBitacora from 'src/app/reports/estructuraBitacora';
import { ControlCalidadService } from 'src/app/services/controlCalidad/control-calidad.service';
import { recepcionTransporte } from 'src/app/interfaces/recepcionTransporte';
import { RecepcionTransService } from '../../../../services/recepcion/recepcion-trans.service';

@Component({
  selector: 'app-ver-productor',
  templateUrl: './ver-productor.component.html',
  styleUrls: ['./ver-productor.component.scss'],
})
export class VerProductorComponent implements OnInit {

  public id_productor: number = 0;
  public productor!: Productor;
  public cargando: boolean = true;
  public isVisible: boolean = false;
  public tipoIcon: string = '';
  public color: string = '';
  public liquidaciones: any[] = [];
  public bitacoras: any[] = [];
  public editCache: { [key: number]: { edit: boolean; data: any } } = {};

  public dateFormat = 'MM/dd/yyyy';
  public rangofechas:Date[]  = [] ;
  public rangofechasBit:Date[]  = [] ;
 

  constructor(
    private rutaActiva: ActivatedRoute,
    private productoresService: ProductoresService,
    private bodegaExternaService: BodegaExternaService,
    private cdref: ChangeDetectorRef,
    private router: Router,
    private controlService: ControlCalidadService,
    private recepcionTransService:RecepcionTransService
  ) {}

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(({ id }) => {
      this.getProductor(id);
      this.id_productor = id
    });
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
        if (this.productor.activo === true) {
          this.color = '#52c41a';
          this.tipoIcon = 'check-circle';
        } else {
          this.color = 'red';
          this.tipoIcon = 'close-circle';
        }
        this.cargarBitacoras(this.productor.id_productor);
        this.cargarLiquidaciones(this.productor.id_productor);
      });
  }

  /**
   * carga las gavetas por productor
   * @param id_productor id del productor en la base
   */
   cargarBitacoras(id_productor: number) {
    this.bodegaExternaService
      .obtenerGavetasProductor(id_productor)
      .subscribe((resp: any) => {
        console.log(resp);
        this.bitacoras = resp;
      });
  }

  /**
   * carga las liquidaciones del productor
   * @param id_productor id del productor en la base
   */
  cargarLiquidaciones(id_productor: number) {
    this.productoresService
      .obtenerLiquidaciones(id_productor)
      .subscribe((resp: any) => {
        this.liquidaciones = resp;
        this.cargando = false;
      });
  }

 

  /**
   * filtra por fechas las liquidaciones del productor
   * 
   */
  onChange(result: Date[]){
  let liquiFiltradas:any[] = [];
    if (result.length !== 0){
      this.liquidaciones.forEach(element => {
        let fechaLiq : Date = new Date(element.calibrado.fecha)
            if (fechaLiq.getTime() >= this.rangofechas[0].getTime() && fechaLiq.getTime() <= this.rangofechas[1].getTime() ) {
              liquiFiltradas.push(element)
            }
        });
        this.liquidaciones = liquiFiltradas
    }else{
      this.cargarLiquidaciones(this.id_productor);
    }
  }

  /**
   * filtra por fechas las liquidaciones del productor
   * 
   */
   onChangeBit(result: Date[]){
    let bitacorasFiltradas:any[] = [];
      if (result.length !== 0){
        this.bitacoras.forEach(element => {
          let fechabit : Date = new Date(element.fecha)
              if (fechabit.getTime() >= this.rangofechasBit[0].getTime() && fechabit.getTime() <= this.rangofechasBit[1].getTime() ) {
                bitacorasFiltradas.push(element)
              }
          });
          this.bitacoras = bitacorasFiltradas
      }else{
        this.cargarBitacoras(this.id_productor);
      }
    }

  /**
   * redirigue a la vista de la liquidacion
   * @param data id del la liquidacion
   */
  verLiquidacion(data: any) {
    const idLiq = data.calibrado.id_calibrado;
    this.router.navigate([`liquidacion/${idLiq}`], {
      relativeTo: this.rutaActiva,
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * genera el reporte de liquidacion
   * @param liquidacion datos de la liquidacion
   */
  async generarDoc(liquidacion: any) {
    const productor = this.productor.nombre + ' ' + this.productor.apellido;
    Swal.fire({
      title: 'Generando reporte de Liquidación...',
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
            reportStrcuture.HeaderLiquidacion(
              liquidacion.calibrado.num_liquidacion
            ),
            reportStrcuture.LineHorizontal(),
            reportStrcuture.InfoLiquidacion(productor, liquidacion),
            reportStrcuture.TablaInformacion(liquidacion),
          ],
          margin: [0, 0, 0, 0],
        },
      ],
    };
    Swal.close();
    pdfMake.createPdf(docDefinition).download('reportLiquidacion.pdf');
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
  
  verBitacora(id: number){
    const productor = this.productor.nombre + ' ' + this.productor.apellido;
    let bitacora:any ;
    this.bitacoras.forEach(element => {
      if (element.id_bodega == id) {
        bitacora = element
       // console.log(bitacora);
      }
    });
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
                reportBitacora.DetailControl(bitacora, productor,controlCalidad.gav_vacias,controlCalidad.num_gav_rechazo ),
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
