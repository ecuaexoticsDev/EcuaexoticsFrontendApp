import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Productor } from '../../../models/productor';
import { ProductoresService } from '../../../services/productores/productores.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productores',
  templateUrl: './productores.component.html',
  styleUrls: ['./productores.component.scss']
})
export class ProductoresComponent implements OnInit {

  public  isVisible = false;
  public  verBuscar = false;
  public cargando = true;
  public searchValue = '';
  public filterprod = [
    {text: 'Sí', value: true},
    {text: 'No', value: false},
  ];
  public listOfData: Productor[] = [];
  public editCache: { [key: number]: { edit: boolean; data: Productor } } = {};
  public prodFilterFn = (list: string[], item: Productor) => list.some(
    (is_active) => item.activo.toString().indexOf(is_active)!==-1 
  );

  public prodForm:FormGroup = this.fb.group({
    nombre:[null, Validators.required],
    apellido:[null, Validators.required],
    email: [null,[Validators.required, Validators.email]],
    direccion: [null,[Validators.required, Validators.minLength(3)]],
    telefono: [null,[Validators.required,Validators.minLength(6)]],
  })

  constructor(private productoresService:ProductoresService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cargarProductores();
  }

  /**
   * carga los datos en la tabla de productores
   */
  cargarProductores(){
    this.productoresService.cargarProductoresTodos().subscribe(
      (resp:any)=>{
        
          this.listOfData = resp;
          this.updateEditCache();
          this.cargando = false;
      },(err)=>{
        Swal.fire('Error', 'Sucedio un error, no se pudo cargar los Productores', 'error');
        
      },
    )
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

   /**
   * guarda los datos actualizados de la tabla de productores
   * @param data datos del productore para actualizar
   * @returns 
   */
  saveEdit(data: Productor): void {
    const expreg =  new RegExp("^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$","i");  
    const productorUpdate: Productor = this.editCache[data.id_productor].data
    const index = this.listOfData.findIndex((item) => item.id_productor === data.id_productor);
    if (  expreg.test(productorUpdate.email)===true && productorUpdate.telefono>0 ) {
      this.productoresService.updateProductor(productorUpdate).subscribe(
        (resp:any)=>{
          Object.assign(this.listOfData[index], this.editCache[data.id_productor].data);
          this.editCache[data.id_productor].edit = false;
          Swal.fire('Actualización Exitosa', 'Datos del Productor Actualizados', 'success');
        },(err)=>{
          Swal.fire('Error', 'Sucedio un error, no se pudo actualizar el Productor', 'error');
          this.editCache[data.id_productor].edit = false;
        },
      )
    }else{
      Swal.fire('Error','Verifique que los nuevos datos sean correctos','error');
      return;
    }
  }

  /**
   * actualiza los id's de los datos en la tabla de productor
   */
  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id_productor] = {
        edit: false,
        data: { ...item }, 
      };
    });
    
  }

  /**
   * redirecciona hacia la vista del perfil del productor
   * @param id_usuario id del productor para mostrar su perfil
   */
  verUsuario(id_usuario: number){
    this.router.navigate(['/dashboard/productores/ver-productor/',id_usuario]);
  }

  /**
   * crea un nuevo productor en la base
   * @param data datos del productor extraidos del formulario
   */
  crearProductor(data: Productor){
    this.productoresService.creaProductor(data).subscribe(
      (resp:any)=>{
        this.cargarProductores();
        Swal.fire('Exito','Productor creado exitosamente','success');
      },(error)=>{
        Swal.fire('Error','Sucedio un error inesperado','error');
      }
    )
  }
  
  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex(item => item.id_productor === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  /**
   * resetea la busqueda en la tabla de productores
   */
  reset(): void {
    this.searchValue = '';
    this.cargarProductores();
    this.verBuscar = false;
    
  }

  /**
  * controla la busqueda por nombre en la tabla de productores
  */
  search(): void {
    this.verBuscar = false;
    this.listOfData = this.listOfData.filter(
      (item: Productor) => (item.nombre + item.apellido).toLowerCase()
      .indexOf(this.searchValue.toLowerCase()) !== -1);
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.prodForm.reset();   
  }

  /**
   * controla el form para crear un productor
   * @returns booleano controla la visiblidad del modal
   */
  submitForm(): void {
    if (this.prodForm.invalid) {
      for (const i in this.prodForm.controls) {
        this.prodForm.controls[i].markAsDirty();
        this.prodForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    
    this.crearProductor(this.prodForm.value);
    this.isVisible = false;
    this.prodForm.reset();    
  }

}
