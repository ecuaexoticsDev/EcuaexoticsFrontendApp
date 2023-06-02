import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Productor } from "src/app/models/productor";
import { environment } from "src/environments/environment";
import { ApiProductor } from "../../config/api-productor";
import { ApiCalibrado } from "../../config/api-calibrado";

const base_url: string = environment.base_url;
@Injectable({
  providedIn: "root",
})
export class ProductoresService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los productores disponibles.
   * @returns {Obeservable<any>} Un Observable que emite un array de todos los productores.
   */
  cargarProductoresTodos() {
    const url = ApiProductor.obtener_productores_todos;
    return this.http.get(url);
  }

  /**
   * Obtiene los productores activos.
   * @returns  {Obeservable<any>} Un Observable que emite un array de los productores activos.
   */
  cargarProductores() {
    const url = ApiProductor.obtener_productores;
    return this.http.get(url);
  }

  /**
   * Actualiza la información de un productor existente.
   * @param {Productor} productor productor El objeto Productor con los datos actualizados.
   * @returns {Obeservable<any>}  Un Observable que indica si la actualización fue exitosa.
   */
  updateProductor(productor: Productor) {
    const url =
      ApiProductor.actualizar_productor_by_id + `${productor.id_productor}/`;
    const body = {
      nombre: productor.nombre,
      apellido: productor.apellido,
      email: productor.email,
      direccion: productor.direccion,
      telefono: productor.telefono,
      activo: productor.activo,
    };
    return this.http.put(url, body);
  }

  /**
   * Crea un nuevo productor.
   * @param {Productor} productor El objeto Productor con los datos del nuevo productor.
   * @returns  {Obeservable<any>} Un Observable que indica si la creación fue exitosa.
   */
  creaProductor(productor: Productor) {
    const url = ApiProductor.guardar_productor;
    const body = {
      nombre: productor.nombre,
      apellido: productor.apellido,
      email: productor.email,
      direccion: productor.direccion,
      telefono: productor.telefono,
      activo: productor.activo,
    };
    return this.http.post(url, body);
  }
  /**
   * Obtiene un productor por su ID.
   * @param {number} id_productor El ID del productor.
   * @returns {Obeservable<any>} Un Observable que emite el productor correspondiente al ID especificado.
   */
  getProductorByid(id_productor: number) {
    const url = ApiProductor.obtener_productor_by_id + `${id_productor}/`;
    return this.http.get(url);
  }

  /**
   * Obtiene las liquidaciones de un productor específico.
   * @param {number} id_productor El ID del productor.
   * @returns {Obeservable<any>}  Un Observable que emite un array de las liquidaciones del productor.
   */
  obtenerLiquidaciones(id_productor: number) {
    const url = ApiCalibrado.obtener_liquidaciones + `${id_productor}/`;
    return this.http.get(url);
  }
}
