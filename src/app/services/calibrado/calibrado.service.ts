import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ApiBodega } from "src/app/config/api-bodega";
import { ApiCalibrado } from "src/app/config/api-calibrado";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class CalibradoService {
  constructor(private http: HttpClient) {}

  /**
   * Carga todas las bitácoras de calibrado.
   * @returns {Observable<any>} - Los datos de las bitácoras de calibrado.
   */
  cargarCalibrado() {
    const url = ApiBodega.obtener_todas_bitacoras;
    return this.http.get(url);
  }

  /**
   * Guarda los datos de calibrado.
   * @param {any} data - Los datos de calibrado a guardar.
   * @returns {Observable<any>} - La respuesta del servidor al guardar los datos de calibrado.
   */
  guardarCalibrado(data: any) {
    const url = ApiCalibrado.crear_calibrado;
    return this.http.post(url, data);
  }

  /**
   * Actualiza los datos de calibrado.
   * @param {any} data - Los nuevos datos de calibrado.
   * @param {number} id - El ID del calibrado a actualizar.
   * @returns {Observable<any>} - La respuesta del servidor al actualizar los datos de calibrado.
   */
  actualizarCalibrado(data: any, id: number) {
    const url = ApiCalibrado.actualizar_calibrado + id + "/";
    return this.http.put(url, data);
  }

  /**
   * Obtiene las cajas por calibre.
   * @param {number} id - El ID del calibre.
   * @returns {Observable<any>} - Los datos de las cajas por calibre.
   */
  getCajasCalibre(id: number) {
    const url = ApiCalibrado.obtener_cajas + id + "/";
    return this.http.get(url);
  }

  /**
   * Obtiene las cajas disponibles para un pallet específico.
   * @param {number} id_pallet - El ID del pallet.
   * @returns {Observable<any>} - Los datos de las cajas disponibles para el pallet.
   */
  obtenerCajas(id_pallet: number) {
    const url = ApiCalibrado.obtener_cajas_disponibles + `${id_pallet}/`;
    return this.http.get(url);
  }

  /**
   * Obtiene las cajas disponibles para un tipo de pitahaya especifico.
   * @param {string} tipo_pitahaya - El tipo de pitahaya.
   * @returns {Observable<any>} - Los datos de las cajas disponibles por tipo de pitahaya.
   */
  obtenerCajasbyPitahaya(tipo_pitahaya: string) {
    const url =
      ApiCalibrado.obtener_cajas_disponibles_byPitahaya + `${tipo_pitahaya}/`;
    return this.http.get(url);
  }

  /**
   * Actualiza el precio de un item de liquidación específico.
   * @param {number} id_item_liquidacion - El ID del item de liquidación a actualizar.
   * @param {number} data - El nuevo precio del item de liquidación.
   * @returns {Observable<any>} - La respuesta del servidor al actualizar el item de liquidación.
   */
  actualizarItem(id_item_liquidacion: number, data: number) {
    const url =
      ApiCalibrado.actualizar_item_liquidacion + `${id_item_liquidacion}/`;

    const body = {
      precio: data,
    };
    return this.http.put(url, body);
  }

  /**
   * Actualiza el estado de un item de liquidación específico.
   * @param {number} id_item_liquidacion - El ID del item de liquidación a actualizar.
   * @param {boolean} estadoActual - El nuevo estado del item de liquidación.
   * @returns {Observable<any>} - La respuesta del servidor al actualizar el item de liquidación.
   */

  actualizarEstado(id_item_liquidacion: number, estadoActual: boolean) {
    const url =
      ApiCalibrado.actualizar_estado_liquidacion + `${id_item_liquidacion}/`;
    const body = {
      estado: estadoActual,
    };
    return this.http.put(url, body);
  }

  /**
   * Actualiza la información de una liquidación específica.
   * @param {number} id_liquidacion - El ID de la liquidación a actualizar.
   * @param {any} data - Los nuevos datos de la liquidación.
   * @returns {Observable<any>} - La respuesta del servidor al actualizar la liquidación.
   */
  actulizarLiquidacion(id_liquidacion: number, data: any) {
    const url = ApiCalibrado.actualizar_info_liquidacion + `${id_liquidacion}/`;
    return this.http.put(url, data);
  }
}
