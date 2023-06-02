import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiBodega } from "src/app/config/api-bodega";
import { environment } from "src/environments/environment";

const base_url: string = environment.base_url;

@Injectable({
  providedIn: "root",
})
export class BodegaExternaService {
  constructor(private http: HttpClient) {}

  /**
   * Carga las bitácoras de la bodega.
   * @returns {Observable<any>} - Los datos de las bitácoras de la bodega.
   */
  cargarBodega(): Observable<any> {
    const url = `${base_url}bodega/obtener_bitacoras/`;
    return this.http.get(url);
  }
  /**
   * Crea una nueva bitácora.
   * @param {any} data - Los datos de la nueva bitácora.
   * @returns {Observable<any>} - La respuesta del servidor al crear la bitácora.
   */
  crearBitacora(data: any): Observable<any> {
    const url = `${base_url}bodega/crear_bitacora/`;
    return this.http.post(url, data);
  }

  /**
   * Actualiza el número de gavetas, los kilogramos reportados y los kilogramos recibidos de una bitácora específica.
   * @param {number} id_bodega - El ID de la bitácora a actualizar.
   * @param {number} num_gavetas - El nuevo número de gavetas.
   * @param {number} kg_reportados - Los nuevos kilogramos reportados.
   * @param {number} kg_recibidos - Los nuevos kilogramos recibidos.
   * @returns {Observable<any>} - La respuesta del servidor al actualizar la bitácora.
   */
  actualizarGavetas(
    id_bodega: number,
    num_gavetas: number,
    kg_reportados: number,
    kg_recibidos: number
  ) {
    const url = `${base_url}bodega/actualizar_bitacora/${id_bodega}/`;
    const data = {
      num_gavetas: num_gavetas,
      kg_reportados: kg_reportados,
      kg_recibidos: kg_recibidos,
    };
    return this.http.put(url, data);
  }

  /**
   * Actualiza el número de sello de salida de una bitácora específica.
   * @param {number} id_bodega - El ID de la bitácora a actualizar.
   * @param {string} num_sello_salida - El nuevo número de sello de salida.
   * @returns {Observable<any>} - La respuesta del servidor al actualizar la bitácora.
   */
  actualizarSellos(id_bodega: number, num_sello_salida: string) {
    const url = `${base_url}bodega/actualizar_bitacora_sellos/${id_bodega}/`;
    const data = {
      num_sello_salida: num_sello_salida,
    };
    return this.http.put(url, data);
  }

  /**
   * Obtiene las bitácoras de la bodega de un productor específico.
   * @param {number} id_productor - El ID del productor.
   * @returns {Observable<any>} - Los datos de las bitácoras de la bodega del productor.
   */
  obtenerGavetasProductor(id_productor: number) {
    const url = ApiBodega.obtener_bitacoras_by_productor + `${id_productor}/`;
    return this.http.get(url);
  }
  obtenerBodegabyId(id_productor: number, id_bodega: number) {
    const url =
      ApiBodega.obtener_bitacoras_by_Id + `${id_productor}/` + `${id_bodega}`;
    return this.http.get(url);
  }
}
