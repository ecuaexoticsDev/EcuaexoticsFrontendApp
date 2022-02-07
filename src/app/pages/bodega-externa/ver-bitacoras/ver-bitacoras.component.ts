import { Component, OnInit } from '@angular/core';
import { bodegaExterna } from 'src/app/interfaces/bodegaExterna';
import { BodegaExternaService } from 'src/app/services/bodegaExterna/bodega-externa.service';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-ver-bitacoras',
  templateUrl: './ver-bitacoras.component.html',
  styleUrls: ['./ver-bitacoras.component.scss'],
})
export class VerBitacorasComponent implements OnInit {
  public listOfData: bodegaExterna[] = [];
  public editCache: { [key: number]: { edit: boolean; data: bodegaExterna } } = {};

  constructor(
    private bodegaExterna: BodegaExternaService,
   ) {}
 

  ngOnInit(): void {
    this.cargarRegistros();
    
  }

  /**
   * carga los registros de la base de datos
   */
  cargarRegistros() {
    this.bodegaExterna.cargarBodega().subscribe((resp: any) => {
      console.log(resp);
      this.listOfData = resp;
      this.updateEditCache();
    });
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
   * @param data objeto de bodega externa requerido para 
   * actualizar sus datos
   */
  saveEdit(data: bodegaExterna): void {
    const index = this.listOfData.findIndex((item) => item.id_bodega === data.id_bodega);
    const idBodega = this.listOfData[index].id_bodega
    const gavetas = this.editCache[data.id_bodega].data.num_gavetas
    const kg_reportados = this.editCache[data.id_bodega].data.kg_reportados
    const kg_recibidos = this.editCache[data.id_bodega].data.kg_recibidos
    this.bodegaExterna.actualizarGavetas(idBodega,gavetas,kg_reportados,kg_recibidos).subscribe(
        (resp:any)=>{
          Swal.fire('Actualización Exitosa', 'Número de Gavetas Actualizado', 'success');
          const index = this.listOfData.findIndex((item) => item.id_bodega === data.id_bodega);
          Object.assign(this.listOfData[index], this.editCache[data.id_bodega].data);
          this.editCache[data.id_bodega].edit = false;
        }, (err)=>{
          Swal.fire('Error', 'Sucedio un error, no se pudo actualizar el elemento', 'error');
          this.editCache[data.id_bodega].edit = false;
         
        },
    );
  }

  /**
   * se encarga de actualizar los ids de los objetos en los arreglos
   */
  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id_bodega] = {
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
    const index = this.listOfData.findIndex(item => item.id_bodega === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  
}
