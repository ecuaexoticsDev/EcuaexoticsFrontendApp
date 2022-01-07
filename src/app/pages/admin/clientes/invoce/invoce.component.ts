import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Location } from '@angular/common';
import { SolicitarConfirmacion } from 'src/app/components/informationAlert';

@Component({
  selector: 'app-invoce',
  templateUrl: './invoce.component.html',
  styleUrls: ['./invoce.component.scss']
})
export class InvoceComponent implements OnInit {

  public id_factura : number = 0 ;
  public cliente!: Cliente ;
  public cargando: boolean = true;
  public factura: any;
  public listOfData: any[]= [];
  public editCache: { [key: number]: { edit: boolean; data: any } } = {};
  public invoceForm:FormGroup = this.fb.group({
    fecha: [null,[Validators.required]],
    fact: [null,[Validators.required, Validators.minLength(3)]],
    exportRef: [null,[Validators.required, Validators.minLength(3)]],
  })

  constructor(private rutaActiva: ActivatedRoute,private fb: FormBuilder,
    private clientesService:ClientesService,private location: Location) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      ({id,idInv})=>{
        this.getCliente(id);
        this.id_factura = idInv;
      }
    )
  }

  getCliente(id_cliente: number){
    this.cargando = true;
    this.clientesService.getClienteByid(id_cliente).subscribe(
      ( cliente :any)=>{
        this.cliente = cliente;
        this.getItemsInvoice(this.cliente.id_cliente);
        //this.cargando = false;
      }
    )
  }

  getItemsInvoice(id_cliente: number){
    this.clientesService.getInvoice(id_cliente).pipe( delay(100)).subscribe(
        (resp:any)=>{
          resp.forEach( (element:any) => {
            if ( this.id_factura == element.factura.id_factura  ) {
                 this.factura = element.factura;
                 if (this.factura.fecha!==null) {
                   this.invoceForm.get('fecha')?.setValue( new Date(this.factura.fecha) );
                 }
                 element.items_tipo_pitahaya.forEach((items:any) => {
                  items.items_tipo_caja.forEach( (caja :any) => {
                    if (caja.id_item_factura !== 0  ) {
                      this.listOfData.push(caja);
                    }
                  });
                });   
                this.updateEditCache();
            }  
          });
          this.cargando = false;
        }
    )
  }

  convertDate(date: Date): string {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  }

  submitForm(): void {
    if (this.invoceForm.invalid) {
      for (const i in this.invoceForm.controls) {
        this.invoceForm.controls[i].markAsDirty();
        this.invoceForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    this.asignarDatos(this.invoceForm);
    //console.log(this.invoceForm.value);
    this.clientesService.updateFactura(this.id_factura, this.factura ).subscribe(
      (resp:any)=>{
        Swal.fire('Listo','Datos Asignados','success')
      },(error)=>{
        Swal.fire('Error','Error al Asignar los Datos','error')
      }
    )  
  }

  asignarDatos(data: FormGroup){
    this.factura.id_factura = this.id_factura;
    this.factura.fecha = this.convertDate(data.get('fecha')?.value); 
    this.factura.referencia_exportacion = data.get('exportRef')?.value;
    this.factura.factura_num = data.get('fact')?.value;
    this.factura.id_cliente = this.cliente.id_cliente;
  }
 

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  saveEdit(data: any): void {

    let itemUpdate: any; 
    itemUpdate = this.editCache[data.id_item_factura].data
    console.log(itemUpdate.precio_caja);
    if (itemUpdate.precio_caja<0) {
      Swal.fire('Error', 'No ingresar Precios Negativos','error')
      return;
    }
    const index = this.listOfData.findIndex((item) => item.id_item_factura === data.id_item_factura);
    this.clientesService.updatePrecio(data.id_item_factura, itemUpdate.precio_caja).subscribe(
      (resp:any)=>{
        Object.assign(this.listOfData[index], this.editCache[data.id_item_factura].data);
        this.editCache[data.id_item_factura].edit = false;
        Swal.fire('Actualización Exitosa', 'Precio Actualizado', 'success');
      },(err)=>{
        console.log(err);
        Swal.fire('Error', 'Sucedio un error, no se pudo actualizar el Precio', 'error');
        this.editCache[data.id_item_factura].edit = false;
      },
    )
  }

  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id_item_factura] = {
        edit: false,
        data: { ...item }, 
      };
    });
   
    
  }

  cancelEdit(id: number): void {

    const index = this.listOfData.findIndex(item => item.id_item_factura === id);
      this.editCache[id] = {
        data: { ...this.listOfData[index] },
        edit: false
      };
  }

  async finalizarInvoice(): Promise<any> {
    this.listOfData.forEach((element) => {
       if (element.precio_caja === 0) {
         Swal.fire('Error', 'Ingrese el precio en todos lo elementos', 'error');
         console.log('ingrese el precio ');
         return;
       }
     });
 
     const confirmacion = await SolicitarConfirmacion(
       '¿Desea finalizar el Invoice?'
     );
     if (confirmacion) {
       Swal.fire({
         title: 'Guardando Invoice...',
         didOpen: () => {
           Swal.showLoading();
         },
       });
       this.clientesService.updateEstadoInvoice(this.id_factura, true).subscribe(
         (resp: any) => {
           Swal.close();
           Swal.fire(
             'Listo',
             'Los Datos de la Liquidación se Guardaron Exitosamente',
             'success'
           );
           this.location.back();
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