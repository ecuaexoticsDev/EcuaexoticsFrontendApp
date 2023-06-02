import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { palletizado } from "src/app/interfaces/palletizado.interface";
import { ApiPalletizado } from "../../config/api.palletizado";
import { pallet } from "src/app/interfaces/Pallet.interface";
import { itemPallet } from "src/app/interfaces/itemPallet.interface";
import { UrlTree } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class PalletizadoService {
  constructor(private http: HttpClient) {}

  /**
   * Crea un nuevo registro de palletizado.
   * @param {number} id_usuario El ID del usuario que realiza el palletizado.
   * @returns {Observable<any>} - Un Observable que indica si la creación fue exitosa.
   */
  crearPalletizado(id_usuario: number) {
    const url = ApiPalletizado.crear_palletizado;
    const body = {
      id_usuario: id_usuario,
    };
    return this.http.post(url, body);
  }

  /**
   * Crea un nuevo pallet.
   * @param {pallet} pallet Un objeto de tipo pallet para agregarlo a la base.
   * @returns {Observable<any>} - Un Observable que indica si la creación fue exitosa.
   */
  crearPallet(pallet: pallet) {
    const url = ApiPalletizado.crear_pallet;
    const body = {
      tipo_pitahaya: pallet.tipo_pitahaya,
      id_cliente: pallet.id_cliente,
      id_palletizado: pallet.id_palletizado,
    };
    return this.http.post(url, body);
  }

  /**
   * Crea un nuevo ítem de pallet.
   * @param {itemPallet} itemPallet Los datos del ítem de pallet a crear.
   * @param {number} id_usuario El ID del usuario que realiza la acción.
   * @returns {Observable<any>} - Un Observable que indica si la creación fue exitosa.
   */
  crearItemPallet(itemPallet: itemPallet, id_usuario: number) {
    const url = ApiPalletizado.crear_item_pallet;
    const body = {
      tipo_caja: itemPallet.tipo_caja,
      num_cajas: itemPallet.num_cajas,
      calibre: itemPallet.calibre,
      id_pallet: itemPallet.id_Pallet,
      id_productor: itemPallet.productor.id_productor,
      id_usuario: id_usuario,
      id_caja: itemPallet.id_caja,
    };
    return this.http.post(url, body);
  }

  /**
   * Obtiene el palletizado final.
   * @returns {Observable<any>} - Un Observable que emite el palletizado final.
   */
  getPalletizado() {
    const url = ApiPalletizado.get_final_palletizado;
    return this.http.get(url);
  }

  /**
   * Obtiene el pallet activo.
   * @returns  {Observable<any>} - Un Observable que emite el pallet activo.
   */
  getPalletActivo() {
    const url = ApiPalletizado.final_palletizado_state_open;
    return this.http.get(url);
  }

  /**
   * Obtiene los pallets asociados a un palletizado específico.
   * @param {number} id_palletizado El ID del palletizado.
   * @returns {Observable<any>} - Un Observable que emite un array de pallets asociados al palletizado.
   */
  getpallets(id_palletizado: number) {
    const url = ApiPalletizado.obtener_pallets + `${id_palletizado}/`;
    return this.http.get(url);
  }

  /**
   * Obtiene los ítems asociados a un pallet específico.
   * @param {number} id_pallet El ID del pallet.
   * @returns {Observable<any>} - Un Observable que emite un array de ítems asociados al pallet.
   */
  getItems(id_pallet: number) {
    const url = ApiPalletizado.obtener_items_pallet + `${id_pallet}/`;
    return this.http.get(url);
  }

  /**
   * Actualiza el cliente asociado a un pallet.
   * @param {number} id_pallet El ID del pallet a actualizar.
   * @param {number} id_cliente El ID del nuevo cliente asociado.
   * @returns {Observable<any>} - Un Observable que indica si la actualización fue exitosa.
   */
  actualizarCliente(id_pallet: number, id_cliente: number) {
    const url = ApiPalletizado.actualizar_cliente_pallet + `${id_pallet}/`;
    const body = {
      id_cliente: id_cliente,
    };
    return this.http.put(url, body);
  }

  /**
   * Elimina un ítem de pallet.
   * @param {number} id_item_pallet El ID del ítem de pallet a eliminar.
   * @returns {Observable<any>} - Un Observable que indica si la eliminación fue exitosa.
   */
  eliminarItem(id_item_pallet: number) {
    const url = ApiPalletizado.eliminar_item_pallet + `${id_item_pallet}/`;
    return this.http.delete(url);
  }

  /**
   * Finaliza el palletizado.
   * @param {number} id_palletizado El ID del palletizado a finalizar.
   * @returns {Observable<any>} - Un Observable que indica si la finalización fue exitosa.
   */
  finalizarPalletiazado(id_palletizado: number) {
    const url = ApiPalletizado.finalizar_palletizado + `${id_palletizado}/`;
    const body = {
      estado: true,
    };
    return this.http.put(url, body);
  }
}
