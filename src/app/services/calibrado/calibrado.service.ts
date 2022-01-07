import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiBodega } from 'src/app/config/api-bodega';
import { ApiCalibrado } from 'src/app/config/api-calibrado';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CalibradoService {
  constructor(private http: HttpClient) {}

  cargarCalibrado() {
    const url = ApiBodega.obtener_todas_bitacoras;
    return this.http.get(url);
  }

  guardarCalibrado(data: any) {
    const url = ApiCalibrado.crear_calibrado;
    return this.http.post(url, data);
  }

  actualizarCalibrado(data: any, id: number) {
    const url = ApiCalibrado.actualizar_calibrado + id + '/';
    return this.http.put(url, data);
  }

  getCajasCalibre(id: number) {
    const url = ApiCalibrado.obtener_cajas + id + '/';
    return this.http.get(url);
  }

  obtenerCajas(id_pallet: number) {
    const url = ApiCalibrado.obtener_cajas_disponibles+`${id_pallet}/`;
    return this.http.get(url);
  }

  actualizarItem(id_item_liquidacion: number, data: number){
    const url = ApiCalibrado.actualizar_item_liquidacion+`${id_item_liquidacion}/`;
    
    const body = { 
      precio: data,
    }
    return this.http.put(url, body);
  }
  
  actualizarEstado(id_item_liquidacion: number, estadoActual : boolean ){
    const url = ApiCalibrado.actualizar_estado_liquidacion+`${id_item_liquidacion}/`;
    const body = {
      estado: estadoActual
    }
    return this.http.put(url, body);
  }

  actulizarLiquidacion(id_liquidacion: number,data:  any){
    const url = ApiCalibrado.actualizar_info_liquidacion + `${id_liquidacion}/`
    return this.http.put(url , data);

  }

}
