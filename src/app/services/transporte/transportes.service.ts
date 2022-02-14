import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiTrasnporte } from 'src/app/config/api-transporte';
import { Transporte } from 'src/app/models/transporte';

@Injectable({
  providedIn: 'root'
})
export class TransportesService {

  constructor(private http: HttpClient) { }

  getTransportes(){
    const url = ApiTrasnporte.obtener_transportes;
     return  this.http.get(url);
  }

  crearTransporte(transporte: Transporte){
    const url = ApiTrasnporte.crear_transportes;
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
    
    const url = ApiTrasnporte.actualizar_transportes+`${transporte.id_transporte}/`
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
}
