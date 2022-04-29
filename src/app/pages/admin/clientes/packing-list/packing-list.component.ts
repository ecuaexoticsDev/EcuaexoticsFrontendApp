import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { delay } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-packing-list',
  templateUrl: './packing-list.component.html',
  styleUrls: ['./packing-list.component.scss']
})
export class PackingListComponent implements OnInit {

  public id_packing : number = 0 ;
  public cargando: boolean = true;
  public cliente!: Cliente ;
  public packing: any;

  public cajasGrandes :any[] = []; // cajas 2.5kg
  public cajasCuatro :any[] = []; //cajas de 4kg
  public cajasPeq :any[] = [] // cajas de 4.5kg
  public cajasDiez :any[] = [] // cajas de 10.,9kg
  public cajasDoce :any[] = [] // cajas de 12,7kg

  public packForm:FormGroup = this.fb.group({
    shippingDate: [null,[Validators.required]],
    fact: [null,[Validators.required, Validators.minLength(3)]],
    packingNo: [null,[Validators.required, Validators.minLength(3)]],
    airline: [null,[Validators.required]],
    awb: [null,[Validators.required]],
    info: [null,[Validators.required]],
  })

  constructor(private rutaActiva: ActivatedRoute,private clientesService:ClientesService,
    private fb: FormBuilder, private location: Location) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(
      ({id,idPack})=>{
        this.id_packing = idPack;
        this.getCliente(id);
        
      }
    )
  }

  getCliente(id_cliente: number){
    this.cargando = true;
    this.clientesService.getClienteByid(id_cliente).subscribe(
      ( cliente :any)=>{
        this.cliente = cliente;
        this.obtenerPackingList(this.cliente.id_cliente);
        
      }
    )
  }

  obtenerPackingList(id_cliente: number){
    this.clientesService.getPackinglist(id_cliente).pipe( delay(200)).subscribe(
      (resp:any)=>{
       
        resp.forEach((element:any) => {
          
         if (element.packing.id_packing == this.id_packing) {
            this.packing = element.packing
            if (this.packing.fecha!== null) {
              const fechaPack = new Date(this.packing.fecha);
              this.packForm.get('shippingDate')?.setValue(fechaPack);
            }
            element.items_tipo_pitahaya.forEach((items:any) => {
              items.items_tipo_caja.forEach((tipoCaja:any) => {
                
                if (tipoCaja.tipo_caja === 'Carton Box 2.5 kg net weight') {
                  tipoCaja.calibres.forEach((data:any) => {
                    this.cajasPeq.push(data)
                  });
                }else if(tipoCaja.tipo_caja === 'Carton Box 4 kg net weight'){
                  tipoCaja.calibres.forEach((data:any) => {
                    this.cajasCuatro.push(data)
                  });
               }else if(tipoCaja.tipo_caja === 'Carton Box 4.5 kg net weight'){
                  tipoCaja.calibres.forEach((data:any) => {
                    this.cajasGrandes.push(data)
                  });
               }else if(tipoCaja.tipo_caja === 'Carton Box 10.9 kg net weight'){
                tipoCaja.calibres.forEach((data:any) => {
                  this.cajasDiez.push(data)
                 
                 
                });
             } else if(tipoCaja.tipo_caja === 'Carton Box 12.7 kg net weight'){
              tipoCaja.calibres.forEach((data:any) => {
                this.cajasDoce.push(data)
              });
           }     
             
            });       
          });
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
    if (this.packForm.invalid) {
      for (const i in this.packForm.controls) {
        this.packForm.controls[i].markAsDirty();
        this.packForm.controls[i].updateValueAndValidity();
      }
      return;
    }
   
    this.asignarDatos(this.packForm);
    this.clientesService.updatePackingList(this.id_packing,this.packing).subscribe(
        (resp)=>{
          Swal.fire('Listo','Datos Asignados','success') 
          this.location.back();
        },(error)=>{
          Swal.fire('Error','Sucedio un error Inersperado, intentelo mas tarde.','error') 
        }
    )
  }

  asignarDatos(data: FormGroup){
    
    this.packing.id_packing = this.id_packing;
    this.packing.factura_num = data.get('fact')?.value;
    this.packing.linea_area = data.get('airline')?.value;
    this.packing.awb = data.get('awb')?.value;
    this.packing.packing_num = data.get('packingNo')?.value;
    this.packing.fda_num = 12758155112;
    this.packing.fecha = this.convertDate(data.get('shippingDate')?.value);
    this.packing.informacion_extra = data.get('info')?.value;
    this.packing.estado =  true;

  }

}
