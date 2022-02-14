import { Component, OnInit } from '@angular/core';
import { recepcionTransporte } from 'src/app/interfaces/recepcionTransporte';

@Component({
  selector: 'app-ver-recepcion-transporte',
  templateUrl: './ver-recepcion-transporte.component.html',
  styleUrls: ['./ver-recepcion-transporte.component.scss']
})
export class VerRecepcionTransporteComponent implements OnInit {

  public listOfData: recepcionTransporte[] = [];
  public editCache: { [key: number]: { edit: boolean; data: recepcionTransporte } } = {};
  constructor() {
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
    let data = {
      id_recepcionTransporte: 1,
      id_usuario: 1,
      id_transportista: 1,
      chofer: "Jorge Mendez",
      fecha: new Date(),
      num_gavetas: 200,
      kg_totales: 100,
      num_gavetas_enviadas: "323",
      num_sello_ingreso: "3313",
      num_sello_salida: "043",
    }
  this.listOfData.push(data);
  this.updateEditCache();
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
      const index = this.listOfData.findIndex((item) => item.id_recepcionTransporte === data.id_recepcionTransporte);
      const id_recepcionTransporte = this.listOfData[index].id_recepcionTransporte
      const gavetas = this.editCache[data.id_recepcionTransporte].data.num_gavetas
      const kg_totales = this.editCache[data.id_recepcionTransporte].data.kg_totales

    }
  
    /**
     * se encarga de actualizar los ids de los objetos en los arreglos
     */
    updateEditCache(): void {
      this.listOfData.forEach((item) => {
        this.editCache[item.id_recepcionTransporte] = {
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
      const index = this.listOfData.findIndex(item => item.id_recepcionTransporte === id);
      this.editCache[id] = {
        data: { ...this.listOfData[index] },
        edit: false
      };
    }
}
