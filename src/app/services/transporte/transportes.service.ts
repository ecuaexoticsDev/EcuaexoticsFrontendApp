import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiTransporte } from 'src/app/config/api-transporte';
import { Transporte } from 'src/app/models/transporte';
import { ApiRecepcion } from '../../config/api-recepcion';
import { Camion } from 'src/app/models/camion';

@Injectable({
  providedIn: 'root'
})
export class TransportesService {

  constructor(private http: HttpClient) { }

  getTransportes(){
    const url = ApiTransporte.obtener_transportes;
     return  this.http.get(url);
  }

  getCamiones(){
    const url = ApiTransporte.obtener_camiones;
    return this.http.get(url);
  }

  getCamiones_by_id(id_transporte: number){
    const url = ApiTransporte.obtener_camiones_by_id_transporte+`${id_transporte}/`
    return this.http.get(url);
  }

  getTransportesbyId(id_transporte: number){
    const url = ApiTransporte.obtener_transporte_id+`${id_transporte}/`;
     return  this.http.get(url);
  }

  crearCamion(data:Camion){
    const url = ApiTransporte.crear_camiones;
    const body = {
      placa: data.placa,
      marca: data.marca,
      capacidad: data.capacidad,
      id_transporte: data.id_transporte
    }
    return this.http.post(url,body);

  }

  actualizarCamion(data: Camion){
    const url = ApiTransporte.actualizar_camion+`${data.id_unidad}/`
    const body = {
      placa: data.placa,
      marca: data.marca,
      capacidad: data.capacidad,
      id_transporte: data.id_transporte
    }
    return this.http.put(url,body);

  }

  crearTransporte(transporte: Transporte){
    const url = ApiTransporte.crear_transportes;
    const body = {
      nombre: transporte.nombre,
      apellido: transporte.apellido,
      cedula: transporte.cedula,
      telefono: transporte.telefono,
      activo: transporte.activo
    }
    return this.http.post(url,body);
  }
  actualizarTransporte(transporte: Transporte){
    
    const url = ApiTransporte.actualizar_transportes+`${transporte.id_transporte}/`
    console.log(url);
    const body = {
      nombre: transporte.nombre,
      apellido: transporte.apellido,
      cedula: transporte.cedula,
      telefono: transporte.telefono,
      activo: transporte.activo
    }
    return this.http.put(url,body);

  }

  ObtenerRecepciones(id_transporte: number){
       const url =  ApiRecepcion.obtener_recepciones_by_transporte+ `${id_transporte}/`
       return this.http.get(url);
  }


}
