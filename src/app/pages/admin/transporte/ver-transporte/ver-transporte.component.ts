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
import { Camion } from '../../../../models/camion';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public camiones: Camion[] = [];
  public editCache: { [key: number]: { edit: boolean; data: Camion } } = {};

  public camionForm:FormGroup = this.fb.group({
    placa:[null, [Validators.required,Validators.minLength(3)]],
    marca:[null, [Validators.required,Validators.minLength(3)]],
    capacidad: [null,[Validators.required,Validators.minLength(2), Validators.maxLength(10), Validators.pattern(/^(\d*\.)?\d+$/)]],
  })

  constructor(private rutaActiva:ActivatedRoute,private fb: FormBuilder,
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
        this.cargarCamiones(id_transporte)
        this.cargarBitacoras(id_transporte)
        
        
        }
      )
  }

  cargarCamiones(id_transporte:number){
    this.transporteService.getCamiones_by_id(id_transporte).subscribe(
      (resp:any)=>{
       
        this.camiones = resp
        this.updateEditCache();
      }

    )
  }

  cargarBitacoras(id_transporte:number){
    this.transporteService.ObtenerRecepciones(id_transporte).subscribe(
      (resp:any)=>{
       
        this.bitacoras = resp
        this.cargando = false;
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
          this.cargarBitacoras(this.id_transporte);
        }
      }
  
  crearCamion(data:Camion){
    data.id_transporte = this.id_transporte
    this.transporteService.crearCamion(data).subscribe(
      (resp:any)=>{
        this.cargarCamiones(this.id_transporte);
        Swal.fire('Exito','Camión asignado exitosamente','success');
      },(error)=>{
        Swal.fire('Error', 'Sucedio un error, no se pudo asignar el Camión, Revise los datos.', 'error');
        return;
      }
    )

  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }


   /**
   * guarda los datos actualizados de la tabla de camiones
   * @param data datos del camion para actualizar
   * @returns 
   */
    saveEdit(data: Camion): void {
      const camionUpdate: Camion = this.editCache[data.id_unidad].data
      camionUpdate.id_transporte = this.id_transporte
      console.log(camionUpdate);
      const index = this.camiones.findIndex((item) => item.id_unidad === data.id_unidad);
          if ( camionUpdate.placa.length > 0 && camionUpdate.capacidad > 0 && camionUpdate.marca.length > 0) {
            this.transporteService.actualizarCamion(camionUpdate).subscribe(
              (resp:any)=>{
                Object.assign(this.camiones[index], this.editCache[data.id_unidad].data);
                this.editCache[data.id_unidad].edit = false;
                Swal.fire('Actualización Exitosa', 'Datos del Camión Actualizados', 'success');
              },(err)=>{
                Swal.fire('Error', 'Sucedio un error, no se pudo actualizar el Camión', 'error');
                this.editCache[data.id_unidad].edit = false;
              },
            )
          }else{
            Swal.fire('Error','Verifique que los nuevos datos sean correctos','error');
            return;
          }
    }




  /**
   * actualiza los id's de los datos en la tabla de camiones
   */
   updateEditCache(): void {
    this.camiones.forEach((item) => {
      this.editCache[item.id_unidad] = {
        edit: false,
        data: { ...item }, 
      };
    });  
  }


  cancelEdit(id: number): void {
    const index = this.camiones.findIndex(item => item.id_unidad === id);
    this.editCache[id] = {
      data: { ...this.camiones[index] },
      edit: false
    };
  }
    
  showModal(): void {
        this.isVisible = true;
      }
    
  handleCancel(): void {
        this.isVisible = false;
        this.camionForm.reset();   
      }
    
      /**
       * controla el form para crear un camion
       * @returns booleano controla la visiblidad del modal
       */
  submitForm(): void {
        if (this.camionForm.invalid) {
          for (const i in this.camionForm.controls) {
            this.camionForm.controls[i].markAsDirty();
            this.camionForm.controls[i].updateValueAndValidity();
          }
          return;
        }
        
        this.crearCamion(this.camionForm.value);
        this.isVisible = false;
        this.camionForm.reset();    
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
      title: 'Generando Bitacora de Transporte...',
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
