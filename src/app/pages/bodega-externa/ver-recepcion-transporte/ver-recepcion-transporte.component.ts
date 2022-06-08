import { Component, OnInit } from '@angular/core';
import { recepcionTransporte } from 'src/app/interfaces/recepcionTransporte';
import Swal from 'sweetalert2';
import { RecepcionTransService } from '../../../services/recepcion/recepcion-trans.service';

@Component({
  selector: 'app-ver-recepcion-transporte',
  templateUrl: './ver-recepcion-transporte.component.html',
  styleUrls: ['./ver-recepcion-transporte.component.scss']
})
export class VerRecepcionTransporteComponent implements OnInit {

  public listOfData: recepcionTransporte[] = [];
  public editCache: { [key: number]: { edit: boolean; data: recepcionTransporte } } = {};
  constructor(private recepcionTransService: RecepcionTransService) {
    // agregar el servicio que me permita obtener las recepciones de los transportistas
   }

  ngOnInit(): void {
    // cargar las recepciones de transportistas
    this.cargarRegistros();
  }


  /**
   * carga los registros de la base de datos
   */
   cargarRegistros() {
     this.recepcionTransService.ObtenerRecepciones().subscribe(
      
       (resp:any)=>{
        console.log(resp);
         this.listOfData = resp
         this.updateEditCache();
       },(err)=>{
        Swal.fire('Error', 'Sucedio un error, no se pudo cargar las Recepciones de Transporte', 'error');
        
      },
     )
  
  }

   /**
   * inicia la edicion de los datos del objeto seleccionado
   * @param id id del objeto a actualizar
   */
    startEdit(id: number): void {
      this.editCache[id].edit = true;
    }
  
    /**
     * actualiza los datos 
     * @param data objeto de recepcion transporte requerido para 
     * actualizar sus datos
     */
    saveEdit(data: recepcionTransporte): void {
      const index = this.listOfData.findIndex((item) => item.id_recepcion_transporte === data.id_recepcion_transporte);
      const id_recepcionTransporte = this.listOfData[index].id_recepcion_transporte
      const gavetas = this.editCache[data.id_recepcion_transporte].data.num_gavetas
      const kg_totales = this.editCache[data.id_recepcion_transporte].data.kg_totales
     
      this.recepcionTransService.actualizarRecepcion(id_recepcionTransporte ,gavetas  ,kg_totales).subscribe(
        (resp:any)=>{
          Swal.fire('Actualización Exitosa', '', 'success');
          const index = this.listOfData.findIndex((item) => item.id_recepcion_transporte === data.id_recepcion_transporte);
          Object.assign(this.listOfData[index], this.editCache[data.id_recepcion_transporte].data);
          this.editCache[data.id_recepcion_transporte].edit = false;
        }, (err)=>{
          Swal.fire('Error', 'Sucedio un error, no se pudo actualizar el elemento', 'error');
          this.editCache[data.id_recepcion_transporte].edit = false;
         
        },
    );

    }
  
    /**
     * se encarga de actualizar los ids de los objetos en los arreglos
     */
    updateEditCache(): void {
      this.listOfData.forEach((item) => {
        this.editCache[item.id_recepcion_transporte] = {
          edit: false,
          data: { ...item },
        };
      });
    }
  
    /**
     * cancela la edicion de los datos del obejto
     * @param id id del objeto para cancelar la edicion
     */
    cancelEdit(id: number): void {
      const index = this.listOfData.findIndex(item => item.id_recepcion_transporte === id);
      this.editCache[id] = {
        data: { ...this.listOfData[index] },
        edit: false
      };
    }
}
