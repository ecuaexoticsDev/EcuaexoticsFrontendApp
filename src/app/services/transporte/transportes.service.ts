import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiTransporte } from "src/app/config/api-transporte";
import { Transporte } from "src/app/models/transporte";
import { ApiRecepcion } from "../../config/api-recepcion";
import { Camion } from "src/app/models/camion";

@Injectable({
  providedIn: "root",
})
export class TransportesService {
  constructor(private http: HttpClient) {}
  /**
   *obtiene todos los transportes en la base
   * @returns Retorna un observable que contiene un array de los transportes
   */
  getTransportes() {
    const url = ApiTransporte.obtener_transportes;
    return this.http.get(url);
  }
  /**
   * obtiene los camiones registrados en la base
   * @returns Retorna un observable que contiene un array de camiones
   */
  getCamiones() {
    const url = ApiTransporte.obtener_camiones;
    return this.http.get(url);
  }
  /**
   * carga los camiones por el id del transporte
   * @param {number} id_transporte
   * @returns retorna un observable con un array de los camiones
   */
  getCamiones_by_id(id_transporte: number) {
    const url =
      ApiTransporte.obtener_camiones_by_id_transporte + `${id_transporte}/`;
    return this.http.get(url);
  }
  /**
   * obtiene mediante el id del transporte el objeto transporte
   * @param {nmber} id_transporte
   * @returns retorna un observable con el transporte
   */
  getTransportesbyId(id_transporte: number) {
    const url = ApiTransporte.obtener_transporte_id + `${id_transporte}/`;
    return this.http.get(url);
  }

  /**
   * crea un nuevo camion dentro de la base
   * @param {Camion} data
   * @returns retorna un observable con la confirmacion del servidor
   */
  crearCamion(data: Camion) {
    const url = ApiTransporte.crear_camiones;
    const body = {
      placa: data.placa,
      marca: data.marca,
      capacidad: data.capacidad,
      id_transporte: data.id_transporte,
    };
    return this.http.post(url, body);
  }

  /**
   * Actualiza los datos del camion
   * @param {Camion} data
   * @returns retorna un observable con la confirmacion del servidor
   */
  actualizarCamion(data: Camion) {
    const url = ApiTransporte.actualizar_camion + `${data.id_unidad}/`;
    const body = {
      placa: data.placa,
      marca: data.marca,
      capacidad: data.capacidad,
      id_transporte: data.id_transporte,
    };
    return this.http.put(url, body);
  }

  /**
   * crea un nuevo transporte en la base
   * @param {Transporte} transporte
   * @returns retorna un observable con la confirmacion del servidor
   */
  crearTransporte(transporte: Transporte) {
    const url = ApiTransporte.crear_transportes;
    const body = {
      nombre: transporte.nombre,
      apellido: transporte.apellido,
      cedula: transporte.cedula,
      telefono: transporte.telefono,
      activo: transporte.activo,
    };
    return this.http.post(url, body);
  }

  /**
   * Actualiza los datos del transporte
   * @param {Transporte} transporte
   * @returns retorna un observable con la confirmacion del servidor
   */
  actualizarTransporte(transporte: Transporte) {
    const url =
      ApiTransporte.actualizar_transportes + `${transporte.id_transporte}/`;
    console.log(url);
    const body = {
      nombre: transporte.nombre,
      apellido: transporte.apellido,
      cedula: transporte.cedula,
      telefono: transporte.telefono,
      activo: transporte.activo,
    };
    return this.http.put(url, body);
  }

  /**
   * Carga las recepciones mediante el id del camion
   * @param {number} id_transporte
   * @returns  Un Observable que emite un array de recepciones.
   */
  ObtenerRecepciones(id_transporte: number) {
    const url =
      ApiRecepcion.obtener_recepciones_by_transporte + `${id_transporte}/`;
    return this.http.get(url);
  }
}
