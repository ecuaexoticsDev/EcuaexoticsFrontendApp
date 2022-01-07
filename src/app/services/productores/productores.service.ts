import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Productor } from 'src/app/models/productor';
import { environment } from 'src/environments/environment';
import { ApiProductor } from '../../config/api-productor';
import { ApiCalibrado } from '../../config/api-calibrado';

const base_url: string = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ProductoresService {

  constructor(private http: HttpClient) { }

  cargarProductoresTodos(){
    const url = ApiProductor.obtener_productores_todos;
    return this.http.get(url);
  }

  cargarProductores(){
   const url = ApiProductor.obtener_productores;
   return this.http.get(url);
  }
  
  updateProductor(productor: Productor){
    const url = ApiProductor.actualizar_productor_by_id+`${productor.id_productor}/` ;
    const body ={
      nombre: productor.nombre,
      apellido: productor.apellido,
      email: productor.email,
      direccion: productor.direccion,
      telefono: productor.telefono,
      activo: productor.activo
    }
    return this.http.put(url,body);
  }

  creaProductor(productor: Productor){
    const url = ApiProductor.guardar_productor;
    const body = {
      nombre: productor.nombre,
      apellido: productor.apellido,
      email: productor.email,
      direccion: productor.direccion,
      telefono: productor.telefono,
      activo: productor.activo
    }
    return this.http.post(url,body);
  }

  getProductorByid(id_productor: number){
    const url = ApiProductor.obtener_productor_by_id + `${id_productor}/`
    return this.http.get(url);

  }

  obtenerLiquidaciones(id_productor: number){
    const url = ApiCalibrado.obtener_liquidaciones + `${id_productor}/`
    return this.http.get(url);

  }


}
