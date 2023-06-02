import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiCliente } from "src/app/config/api-cliente";
import { Cliente } from "../../models/cliente";
import { ApiDocumentos } from "../../config/api-documentos";

@Injectable({
  providedIn: "root",
})
export class ClientesService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los cliente de la base de datos.
   * @returns {Observable<any>} - Los clientes de la base
   */
  getClientesTodos() {
    const url = ApiCliente.obtener_clientes_todos;
    return this.http.get(url);
  }

  /**
   * Obtiene los cliente de la base de datos.
   * @returns {Observable<any>} - Los clientes de la base
   */
  getClientes() {
    const url = ApiCliente.obtener_clientes;
    return this.http.get(url);
  }

  /**
   * obtiene el cliente mediante su id
   * @param {number} id_cliente
   * @returns {Observable<any>} - datos del cliente en la base
   */
  getClienteByid(id_cliente: number) {
    const url = ApiCliente.obtener_cliente_by_id + `${id_cliente}/`;
    return this.http.get(url);
  }

  /**
   * Crea un nuevo cliente.
   * @param {Cliente} cliente - Los datos del cliente a crear.
   * @returns {Observable<any>} - La respuesta del servidor al crear el cliente.
   */
  crearCliente(cliente: Cliente) {
    const url = ApiCliente.guardar_cliente;
    const body = {
      nombre: cliente.nombre,
      email: cliente.email,
      pais: cliente.pais,
      direccion: cliente.direccion,
      activo: cliente.activo,
      destino_orden: cliente.destino_orden,
      notify_address: cliente.notify_address,
      notify: cliente.notify,
      telefono: cliente.telefono,
    };
    return this.http.post(url, cliente);
  }

  /**
   * Actualiza un cliente.
   * @param {Cliente} cliente - Los datos del cliente a actualizar.
   * @returns {Observable<any>} - La respuesta del servidor al actualizar el cliente.
   */
  updateCliente(cliente: Cliente) {
    const url = ApiCliente.actualizar_cliente_by_id + `${cliente.id_cliente}/`;
    const body = {
      nombre: cliente.nombre,
      email: cliente.email,
      pais: cliente.pais,
      direccion: cliente.direccion,
      activo: cliente.activo,
      destino_orden: cliente.destino_orden,
      notify_address: cliente.notify_address,
      notify: cliente.notify,
      telefono: cliente.telefono,
    };
    return this.http.put(url, cliente);
  }

  /**
   * obtiene los packing list de la base
   * @param {number} id_cliente
   * @returns {Observable<any>} - Los datos de los packing list
   */
  getPackinglist(id_cliente: number) {
    const url = ApiDocumentos.obtener_packinglist_cliente + `${id_cliente}/`;
    return this.http.get(url);
  }

  /**
   * Obtiene las facturas de un cliente específico.
   * @param {number} id_cliente El ID del cliente.
   * @returns {Observable<any>} - Un Observable que emite un array de facturas del cliente.
   */
  getInvoice(id_cliente: number) {
    const url = ApiDocumentos.obtener_facturas_cliente + `${id_cliente}/`;
    return this.http.get(url);
  }

  /**
   * Actualiza la información de un packing list existente.
   * @param  {number} id_packing El ID del packing list a actualizar.
   * @param {any} data Los datos actualizados del packing list.
   * @returns {Observable<any>} - Un Observable que indica si la actualización fue exitosa.
   */
  updatePackingList(id_packing: number, data: any) {
    const url = ApiDocumentos.actualizar_info_packinglist + `${id_packing}/`;
    return this.http.put(url, data);
  }

  /**
   * Actualiza el estado de una factura.
   * @param {number} id_invoice El ID de la factura a actualizar.
   * @param {boolean} estado El nuevo estado de la factura.
   * @returns  {Observable<any>} - Un Observable que indica si la actualización fue exitosa.
   */
  updateEstadoInvoice(id_invoice: number, estado: boolean) {
    const url = ApiDocumentos.actualizar_estado_factura + `${id_invoice}/`;
    const body = {
      estado: estado,
    };
    return this.http.put(url, body);
  }

  /**
   * Actualiza el precio de un ítem de factura.
   * @param {number} id_invoice El ID de la factura a actualizar.
   * @param {number} precio El nuevo precio del ítem.
   * @returns {Observable<any>} - Un Observable que indica si la actualización fue exitosa.
   */
  updatePrecio(id_invoice: number, precio: number) {
    const url = ApiDocumentos.actualizar_item_factura + `${id_invoice}/`;
    const body = {
      precio_caja: precio,
    };
    return this.http.put(url, body);
  }

  /**
   * Actualiza la información de una factura.
   * @param {number} id_invoice El ID de la factura a actualizar.
   * @param {any} data Los datos actualizados de la factura.
   * @returns {Observable<any>} - Un Observable que indica si la actualización fue exitosa.
   */
  updateFactura(id_invoice: number, data: any) {
    const url = ApiDocumentos.actualizar_info_factura + `${id_invoice}/`;
    return this.http.put(url, data);
  }
}
