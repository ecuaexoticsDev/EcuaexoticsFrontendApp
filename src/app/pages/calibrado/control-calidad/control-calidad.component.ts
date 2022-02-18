import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { faMinusCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { SolicitarConfirmacion } from 'src/app/components/informationAlert';
import { ControlCalidadService } from 'src/app/services/controlCalidad/control-calidad.service';

import Swal from 'sweetalert2';
import { BodegaExternaService } from '../../../services/bodegaExterna/bodega-externa.service';
import { RecepcionTransService } from '../../../services/recepcion/recepcion-trans.service';

interface FileObject {
  idFile: any;
  name: string;
  file: File;
  state: boolean;
}

@Component({
  selector: 'app-control-calidad',
  templateUrl: './control-calidad.component.html',
  styleUrls: ['./control-calidad.component.scss'],
})
export class ControlCalidadComponent implements OnInit {
  listFileImage: FileObject[] = [];
  faMinusCircle = faMinusCircle;
  faUpload = faUpload;

  id_bodega: number = 0;
  id_recepcion: number = 0;

  txtInputObservacion: FormControl = this.getFormControl();

  public reporteCalidadForm = this.fb.group({
    rechazo: [null, [Validators.required, Validators.minLength(1),Validators.minLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    vacias: [null, [Validators.required, Validators.minLength(1),Validators.minLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    peso: [null, [Validators.required,Validators.minLength(1),Validators.pattern(/^(\d*\.)?\d+$/)]],
    lote: [null, [Validators.required, Validators.minLength(1),Validators.pattern(/^-?(0|[1-9]\d*)?$/),]],
    numSeSa: [ "0", [Validators.required,Validators.minLength(1)]],
  })

  // lista para mostar los motivos al usuario
  public checkOptionsOne:any  = [];
  // lista para argar los motivos de la base
  public motivos: any = [];

  constructor(
    private servicioControlCalidad: ControlCalidadService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private  recepcionTransService: RecepcionTransService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.hasOwnProperty('id_bodega')) {
        this.id_bodega = params['id_bodega'];
        this.id_recepcion = params['id_recepcion'];
      }
    });
    this.servicioControlCalidad.getmotivos().subscribe(
      (resp:any) => {
       
        resp.forEach((element:any) => {
          let motivo = {
            label: `${element.detalle}`,
            value: `${element.detalle}`,
          }
          this.checkOptionsOne.push(motivo);
          this.motivos.push(element);
        });
      }
    )
  }

  /**
   * controla la seleccion de archivos al control 
   * de calidad
   */
  onChangefileSeleted(event: any) {
    if (event.target.files.length > 0) {
      const nameF = event.target.files[0].name;
      const extensionArray = nameF.split('.');
      const extension = extensionArray[extensionArray.length - 1];

      this.listFileImage.push({
        idFile: null,
        name: event.target.files[0].name,
        file: <File>event.target.files[0],
        state: true,
      });
    }
  }

  getFormControl() {
    return new FormControl('', Validators.required);
  }

  removeFileFromList(idx: number) {
    this.listFileImage[idx].state = false;
  }

 
  /**
   * guarda la info del control de calidad en la base
   *  numSeSa: [ '000', [
      Validators.minLength(1),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
   */
  async saveControl() {
    if (this.reporteCalidadForm.valid) {

    const confirmacion = await SolicitarConfirmacion(
      '¿Desea continuar con el registro de control de calidad?'
    );
    if (confirmacion) {
      Swal.fire({
        title: 'Guardando...',
        didOpen: () => {
          Swal.showLoading();
        },
      });

      //formamos la lista de motivos
      let idMotivos: number[] = []
      this.checkOptionsOne.forEach((element:any) => {
        if(element.checked == true){
         this.motivos.forEach( (motivo:any) => {
             if( `${element.label}` === `${motivo.detalle}` ){
              idMotivos.push(motivo.id_motivo)
             }
         });
        }
      });
      let dataControl = new FormData();
      
      dataControl.append('observacion', this.txtInputObservacion.value);
      dataControl.append('id_bodega', String(this.id_bodega));
      // agregar peso , lote , gavetas agregar motivos.
      dataControl.append('num_lote', this.reporteCalidadForm.get('lote')?.value);
      dataControl.append('num_gav_rechazo', this.reporteCalidadForm.get('rechazo')?.value);
      dataControl.append('gav_vacias', this.reporteCalidadForm.get('vacias')?.value);
      dataControl.append('peso_total', this.reporteCalidadForm.get('peso')?.value);
      dataControl.append('motivos', String(idMotivos));

      let cant = 0;
      for (const item of this.listFileImage) {
        if (item.state) {
          cant++;
          let nameImage = 'imagen_' + String(cant);
          dataControl.append(nameImage, item.file);
        }
      }
      dataControl.append('cantidad', String(cant));
      //se suman el total de gavetas que se envian en el camion 
      let num_gavetas_enviadas =  Number(this.reporteCalidadForm.get('rechazo')?.value) +  Number(this.reporteCalidadForm.get('vacias')?.value)

        this.recepcionTransService.actualizarRecepcionSello(this.id_recepcion,num_gavetas_enviadas,this.reporteCalidadForm.get('numSeSa')?.value).subscribe(
          (resp:any)=>{
            this.servicioControlCalidad.guardarControl(dataControl).subscribe(
              (resp: any) => {
               
                Swal.fire(resp.message, '', 'success');
                this.location.back();
              },
              (error: any) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error...',
                  text: JSON.stringify(error),
                });
              }
            ); 
          },
          (error:any)=>{
            Swal.fire({
              icon: 'error',
              title: 'Error...',
              text: JSON.stringify(error),
            });
          }
          
        )
      
       
      
    }

  }
  }
}
