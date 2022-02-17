import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRecepcion } from 'src/app/config/api-recepcion';

@Injectable({
  providedIn: 'root'
})
export class RecepcionTransService {

  constructor(private http: HttpClient) { }

  guardarRecepcion(data: FormData) {
    const url = ApiRecepcion.crear_recepcion;
    return this.http.post(url, data);
  }

  ObtenerRecepciones(){
    const url = ApiRecepcion.obtener_recepciones;
    return this.http.get(url);
  }
  

  actualizarRecepcion(id_recepcion: number,num_gavetas: number, kg_totales: number, 
                     ){
        const url = ApiRecepcion.update_recepcion + `${id_recepcion}/`
        let data  = {
          "kg_totales": kg_totales,
          "num_gavetas": num_gavetas
        }
        return this.http.put(url,data)
       
  }
  actualizarRecepcionSello(id_recepcion:number,num_gavetas_enviadas:number, num_sello_salida: string){
    const url = ApiRecepcion.update_recepcion + `${id_recepcion}/`
    let data  = {
      "num_gavetas_enviadas": num_gavetas_enviadas,
      "num_sello_salida": num_sello_salida
    }
    return this.http.put(url,data)
  }
  
}
