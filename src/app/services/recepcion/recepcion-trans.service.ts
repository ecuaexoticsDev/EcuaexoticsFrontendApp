import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiRecepcion } from "src/app/config/api-recepcion";

@Injectable({
  providedIn: "root",
})
export class RecepcionTransService {
  constructor(private http: HttpClient) {}

  /**
   * Guarda una nueva recepción de datos en el servidor.
   * @param {FormData} data El objeto FormData contiene los datos de la recepción.
   * @returns Un Observable que indica si la recepción fue guardada exitosamente.
   */
  guardarRecepcion(data: FormData) {
    const url = ApiRecepcion.crear_recepcion;
    return this.http.post(url, data);
  }
  /**
   * Obtiene todas las recepciones registradas en el sistema.
   * @returns Un Observable que emite un array de todas las recepciones.
   */
  ObtenerRecepciones() {
    const url = ApiRecepcion.obtener_recepciones;
    return this.http.get(url);
  }
  /**
   * Obtiene los detalles de una recepción segun el id.
   * @param {number} id_recepcion El ID de la recepción deseada.
   * @returns Un Observable que emite los detalles de la recepción solicitada.
   */
  ObtenerRecepcioById(id_recepcion: number) {
    const url = ApiRecepcion.obtener_recepcion_by_id + `${id_recepcion}/`;
    return this.http.get(url);
  }

  /**
   * Actualiza los datos de una recepción existente.
   * @param  {number} id_recepcion El ID de la recepción a actualizar.
   * @param  {number} num_gavetas El número de gavetas actualizado.
   * @param  {number} kg_totales El total de kilogramos actualizado.
   * @returns Un Observable que indica si la actualización fue exitosa.
   */
  actualizarRecepcion(
    id_recepcion: number,
    num_gavetas: number,
    kg_totales: number
  ) {
    const url = ApiRecepcion.update_recepcion + `${id_recepcion}/`;
    let data = {
      kg_totales: kg_totales,
      num_gavetas: num_gavetas,
    };
    return this.http.put(url, data);
  }

  /**
   * Actualiza los datos de una recepción existente, incluyendo el número de gavetas enviadas y el sello de salida.
   * @param {number} id_recepcion El ID de la recepción a actualizar.
   * @param {number} num_gavetas_enviadas El número de gavetas enviadas actualizado.
   * @param {string} num_sello_salida El número de sello de salida actualizado.
   * @returns Un Observable que indica si la actualización fue exitosa.
   */
  actualizarRecepcionSello(
    id_recepcion: number,
    num_gavetas_enviadas: number,
    num_sello_salida: string
  ) {
    const url = ApiRecepcion.update_recepcion + `${id_recepcion}/`;
    let data = {
      num_gavetas_enviadas: num_gavetas_enviadas,
      num_sello_salida: num_sello_salida,
    };
    return this.http.put(url, data);
  }
}
