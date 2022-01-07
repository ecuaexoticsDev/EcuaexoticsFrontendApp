import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import Swal from 'sweetalert2';
import { ClientesService } from '../../../services/clientes/clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  public cargando = true;
  public  isVisible = false;
  public  verBuscar = false;
  public  searchValue = '';
  public  filterclient = [
    {text: 'Sí', value: true},
    {text: 'No', value: false},
  ];
  public listOfData: Cliente[] = [];
  public editCache: { [key: number]: { edit: boolean; data: Cliente } } = {};
  public clientFilterFn = (list: string[], item: Cliente) => list.some(
    (is_active) => item.activo.toString().indexOf(is_active)!==-1 
  );

  public clientForm:FormGroup = this.fb.group({
    nombre:[null, Validators.required],
    email: [null,[Validators.required, Validators.email]],
    telefono: [null,[Validators.required,Validators.minLength(6)]],
    direccion: [null,[Validators.required, Validators.minLength(3)]],
    pais: [null,[Validators.required, Validators.minLength(3)]],
    destino_orden: [null,[Validators.required, Validators.minLength(3)]],
    notify_address: [null,[Validators.required, Validators.minLength(3)]],
    notify: [null,[Validators.required, Validators.minLength(3)]],
  })

  constructor(private router : Router, private fb: FormBuilder,
              private clientesService: ClientesService) { }

  ngOnInit(): void {
    this.cargarClientes();
  }

  /**
   * redirecciona hacia la vista del perfil del cliente
   * @param id_usuario id del cliente para mostrar su perfil
   */
  verUsuario(id_usuario: number){
    this.router.navigate(['/dashboard/clientes/ver-cliente/',id_usuario]);
  }

  /**
   * carga los datos en la tabla de clientes
   */
  cargarClientes(){
    this.cargando =true;
    this.clientesService.getClientesTodos().subscribe(
      (resp:any)=>{
        
        this.listOfData = resp;
        this.updateEditCache();
        this.cargando = false;
      },(error)=>{
        Swal.fire('Error','Sucedio un error inesperado','error')
      }
    )
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

   /**
   * guarda los datos actualizados de la tabla de clientes
   * @param data datos del cliente para actualizar
   * @returns 
   */
  saveEdit(data: Cliente): void {
    const expreg =  new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$","i");  
    const clienteUpdate: Cliente = this.editCache[data.id_cliente].data
    const index = this.listOfData.findIndex((item) => item.id_cliente === data.id_cliente);
    if (  expreg.test(clienteUpdate.email)===true && clienteUpdate.telefono>0 ) {
      this.clientesService.updateCliente(clienteUpdate).subscribe(
        (resp:any)=>{
          Object.assign(this.listOfData[index], this.editCache[data.id_cliente].data);
          this.editCache[data.id_cliente].edit = false;
          Swal.fire('Actualización Exitosa', 'Datos del Cliente Actualizados', 'success');
        },(err)=>{
          Swal.fire('Error', 'Sucedio un error, no se pudo actualizar el Cliente', 'error');
          this.editCache[data.id_cliente].edit = false;
        },
      )
    }else{
      Swal.fire('Error','Verifique que los nuevos datos sean correctos','error');
      return;
    }
  }

  /**
   * crea un nuevo cliente en la base
   * @param data datos del cliente extraidos del formulario
   */
  crearCliente(cliente: Cliente){

    this.clientesService.crearCliente(cliente).subscribe(
      (resp:any)=>{
        this.cargarClientes();
        Swal.fire('Exito','Cliente creado exitosamente','success');
      },(error)=>{
        Swal.fire('Error','Sucedio un error inesperado','error');
      }
    )

  }

  /**
   * actualiza los id's de los datos en la tabla de clientes
   */
  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id_cliente] = {
        edit: false,
        data: { ...item }, 
      };
    });  
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id_cliente === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  /**
   * resetea la busqueda en la tabla de usuarios
   */
  reset(): void {
    this.searchValue = '';
    this.cargarClientes();
    this.verBuscar = false;
  }

   /**
  * controla la busqueda por nombre en la tabla de clientes
  */
  search(): void {
    this.verBuscar = false;
    this.listOfData = this.listOfData.filter(
      (item: Cliente) => (item.nombre).toLowerCase()
        .indexOf(this.searchValue.toLowerCase()) !== -1);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.clientForm.reset();   
  }

  /**
   * controla el form para crear un cliente
   * @returns booleano controla la visiblidad del modal
   */
  submitForm(): void {
    if (this.clientForm.invalid) {
      for (const i in this.clientForm.controls) {
        this.clientForm.controls[i].markAsDirty();
        this.clientForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    this.crearCliente(this.clientForm.value);
    this.isVisible = false;
    this.clientForm.reset();    
  }
}
