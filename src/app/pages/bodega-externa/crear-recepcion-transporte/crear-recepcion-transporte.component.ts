import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { recepcionTransporte } from 'src/app/interfaces/recepcionTransporte';
import { Transporte } from 'src/app/models/transporte';
import { TransportesService } from '../../../services/transporte/transportes.service';
import { ProductoresService } from '../../../services/productores/productores.service';
import { faUpload, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { SolicitarConfirmacion } from 'src/app/components/informationAlert';
import { Usuario } from '../../../models/usuarios';
import { RecepcionTransService } from '../../../services/recepcion/recepcion-trans.service';
import { Location } from '@angular/common';

interface FileObject {
  idFile: any;
  name: string;
  file: File;
  state: boolean;
}
@Component({
  selector: 'app-crear-recepcion-transporte',
  templateUrl: './crear-recepcion-transporte.component.html',
  styleUrls: ['./crear-recepcion-transporte.component.scss']
})
export class CrearRecepcionTransporteComponent implements OnInit {

  listFileImage: FileObject[] = [];
  faMinusCircle = faMinusCircle;
  faUpload = faUpload;
  public valido = false;
  public transporteForm!: FormGroup;
  public listTransportes : Transporte[] = [];
   // lista para mostar los productores al usuario
  public checkOptionsOne:any  = [];
  public id_usuario: number = 0


  constructor(private fb: FormBuilder,private router: Router,
              private localStorageService: LocalStorageService,
              private transportesService:TransportesService,
              private ProductoresService:ProductoresService,
              private recepcionTransService: RecepcionTransService,
              private location: Location ) { 

              }

  ngOnInit(): void {
    this.transporteForm = this.fb.group({
      gavetas: [ null,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/),
        ]
      ],
      kgTotales : [ null, [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(/^(\d*\.)?\d+$/)]],
      numSeIn: [ null,  [Validators.required,
      Validators.minLength(1),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      nombreChofer: [null, [Validators.minLength(1),Validators.required] ],
      placas: ['', Validators.required],
      numGuia: [ null,  [Validators.required,
      Validators.minLength(1),
      Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
    });
    this.cargarProductores()
    this.cargarTransportes()
    this.cargarIdUsuario()
  }

  /**
 * carga los productores activos 
 */
   cargarProductores() {
    this.ProductoresService.cargarProductores().subscribe((resp: any) => {
      resp.forEach((element:any) => {
        let prodCheck = {
          label: `${element.nombre} ${element.apellido}`,
          value: `${element.id_productor}`,
        }
        this.checkOptionsOne.push(prodCheck);
      });
    });
  }

  cargarTransportes(){
    this.transportesService.getTransportes().subscribe(
     (resp:any)=>{
          this.listTransportes = resp
     }
    )
  }
/**
 * get id del usuario 
 */
 cargarIdUsuario(){
  let usuario: Usuario =  this.localStorageService.getUserLocalStorage()
  this.id_usuario = usuario.id
}
  /**
   * controla la seleccion de archivos a la recepcion de transporte 
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

  removeFileFromList(idx: number) {
    this.listFileImage[idx].state = false;
  }

  validarRecepcion(){
    this.checkOptionsOne.forEach((element:any) => {
      if (element.checked && this.listFileImage.length>0) {
        this.valido = true;
      }
    });
  }

  async saveRecepcion(){
    this.validarRecepcion()
    if (!this.valido) {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Debe seleccionar un Productor \n Y Agregar una imagen',
      });
      return
    }

    if (this.transporteForm.valid) {

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
        let idProductores: number[] = []
        this.checkOptionsOne.forEach((element:any) => {
          if(element.checked == true){
            idProductores.push(element.value)
          }
        });
        let dataControl = new FormData();
        dataControl.append('id_usuario', String(this.id_usuario));
        dataControl.append('id_transporte', this.transporteForm.get('placas')?.value.id_transporte);
        // agregar peso , lote , gavetas agregar motivos.
        dataControl.append('num_gavetas', this.transporteForm.get('gavetas')?.value);
        dataControl.append('chofer', this.transporteForm.get('nombreChofer')?.value);
        dataControl.append('kg_totales', this.transporteForm.get('kgTotales')?.value);
        dataControl.append('num_gavetas_enviadas', String(0));
        dataControl.append('num_sello_ingreso', this.transporteForm.get('numSeIn')?.value);
        dataControl.append('num_sello_salida', String(0));
        dataControl.append('num_guia_remision', this.transporteForm.get('numGuia')?.value);
        dataControl.append('productores', String(idProductores));
  
        let cant = 0;
        for (const item of this.listFileImage) {
          if (item.state) {
            cant++;
            let nameImage = 'imagen_' + String(cant);
            dataControl.append(nameImage, item.file);
          }
        }
        dataControl.append('cantidad', String(cant));
              this.recepcionTransService.guardarRecepcion(dataControl).subscribe(
                (resp: any) => {
                  Swal.fire("Recepción de Transporte creada con  exito ", '', 'success');
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
            }
      }
    }

  }
