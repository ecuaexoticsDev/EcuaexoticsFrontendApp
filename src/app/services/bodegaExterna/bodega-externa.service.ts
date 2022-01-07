import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBodega } from 'src/app/config/api-bodega';
import { environment } from 'src/environments/environment';

const base_url: string = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class BodegaExternaService {

  constructor(private http: HttpClient) { }

  cargarBodega(){
    const url =  `${base_url}bodega/obtener_bitacoras/`;
    return this.http.get(url);
  }

  crearBitacora(data: any ){
    const url = `${base_url}bodega/crear_bitacora/`;
    return this.http.post(url, data);
  }

  actualizarGavetas(id_bodega: number, num_gavetas: number){
    const url = `${base_url}bodega/actualizar_bitacora/${id_bodega}/`;
    const data = {
      'num_gavetas': num_gavetas
    }
    return this.http.put(url,data);
  }

 obtenerGavetasProductor(id_productor: number){
   const url = ApiBodega.obtener_bitacoras_by_productor+`${id_productor}/`
   return this.http.get(url);

 }
  
}
