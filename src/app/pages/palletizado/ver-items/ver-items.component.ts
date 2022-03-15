import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { itemPallet } from 'src/app/interfaces/itemPallet.interface';
import { pallet } from 'src/app/interfaces/Pallet.interface';
import { Cliente } from 'src/app/models/cliente';
import { PalletizadoService } from 'src/app/services/palletizado/palletizado.service';
import Swal from 'sweetalert2';
import { ClientesService } from '../../../services/clientes/clientes.service';

@Component({
  selector: 'app-ver-items',
  templateUrl: './ver-items.component.html',
  styleUrls: ['./ver-items.component.scss']
})
export class VerItemsComponent implements OnInit {

  public idPallet: number = 0 ;
  public editCache: { [key: number]: { edit: boolean; data: itemPallet } } = {};
  public listOfData: itemPallet[] = [];
  public clientes: Cliente[] = [];
  public selectedValue: string = '';
  public totalCajas: number = 0 ;
  // para desplegar modal 
  public mostrarModal = false;
  public clienteForm:FormGroup = this.fb.group({
    cliente: [null, Validators.required], 
  });

  constructor(private rutaActiva: ActivatedRoute, 
              private clientesService:ClientesService,
              private palletizadoService: PalletizadoService,
              private fb: FormBuilder) { 
    this.idPallet = this.rutaActiva.snapshot.params.id;
    
  }

  ngOnInit(): void {
    this.cargarData();
    this.cargarClientes()
  }
  
  /**
   * carga los clientes disponibles para la actualizacion
   */
  cargarClientes(){
    this.clientesService.getClientes().subscribe(
      (resp:any)=>{
       this.clientes = resp;
      }
    )
  }
 
  /**
   * carga los items del pallet
   */
  cargarData(){
    this.palletizadoService.getItems(this.idPallet).subscribe(
      (resp:any)=>{
        this.listOfData = resp;
        this.updateEditCache();
      }
  )
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

   /**
    * elimina al item de la tabla 
    * @param id identificador del item
    */
  deleteRow(id: number): void {

    if(id!== null || id>0 ||this.listOfData.includes(id)){
      this.palletizadoService.eliminarItem(id).subscribe(
        (resp:any)=>{
          this.listOfData = this.listOfData.filter(d => d.id_item_pallet !== id);
          this.listOfData.forEach(element => {
            this.totalCajas = 0
            this.totalCajas += element.num_cajas
          });
          
          Swal.fire('Exito',"Elemento eliminado correctamente",'success') 
        },(error)=>{
          Swal.fire('Error',"Ocurrio un error al eliminar el elemento",'error')
        }
      )
    }   
  }
  
  /**
   * actualiza los datos la lista de items del pallet
   */
  updateEditCache(): void {
    this.listOfData.forEach(
      item => {
      this.editCache[item.id_item_pallet] = {
        edit: false,
        data: { ...item } 
      };
    }
    );
    this.listOfData.forEach(element => {
      this.totalCajas += element.num_cajas
    });
    
  }

  showModal(): void {
    this.mostrarModal = true;
  }

  handleCancel(): void {
    this.mostrarModal = false;
    this.clienteForm.reset();   
  }

   
   /**
    * aqui se hace un upadte al pallet cambiando su cliente asignado
    * @param data id del pallet a acatualizar
    */
   upadteCLientePallet(data: FormGroup){
    this.palletizadoService.actualizarCliente(this.idPallet, data.value.cliente.id_cliente)
    .subscribe(
      (resp:any)=>{
        Swal.fire('Cliente Actualizado','','success')
      },(error)=>{
        Swal.fire('Error','Sucedio un Error Inesperado','error')
      }
    )
  }

  /**
   * controla el formulario para la asginacion del nuevo cliente
   * @returns booleano que controla la visibildad del modal
   */
  submitForm(): void {
    if (this.clienteForm.invalid) {
      for (const i in this.clienteForm.controls) {
        this.clienteForm.controls[i].markAsDirty();
        this.clienteForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    this.upadteCLientePallet(this.clienteForm)
    this.mostrarModal = false;
    this.clienteForm.reset();    
  }

}
