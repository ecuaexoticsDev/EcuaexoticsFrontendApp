import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiTransporte } from 'src/app/config/api-transporte';
import { Transporte } from 'src/app/models/transporte';
import { ApiRecepcion } from '../../config/api-recepcion';

@Injectable({
  providedIn: 'root'
})
export class TransportesService {

  constructor(private http: HttpClient) { }

  getTransportes(){
    const url = ApiTransporte.obtener_transportes;
     return  this.http.get(url);
  }

  getTransportesbyId(id_transporte: number){
    const url = ApiTransporte.obetner_transporte_id+`${id_transporte}/`;
     return  this.http.get(url);
  }

  crearTransporte(transporte: Transporte){
    const url = ApiTransporte.crear_transportes;
    const body = {
      nombre: transporte.nombre,
      apellido: transporte.apellido,
      cedula: transporte.cedula,
      placa: transporte.placa,
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
      placa: transporte.placa,
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
