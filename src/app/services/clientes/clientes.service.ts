import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiCliente } from 'src/app/config/api-cliente';
import { Cliente } from '../../models/cliente';
import { ApiDocumentos } from '../../config/api-documentos';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }
  
  getClientesTodos(){
    const url = ApiCliente.obtener_clientes_todos;
    return this.http.get(url);
  }

  getClientes(){
    const url = ApiCliente.obtener_clientes;
    return this.http.get(url);
  }
  
  getClienteByid(id_cliente: number){
    const url = ApiCliente.obtener_cliente_by_id +`${id_cliente}/`;
    return this.http.get(url);
  }

  crearCliente(cliente: Cliente){
    const url = ApiCliente.guardar_cliente;
    const body ={
      nombre: cliente.nombre,
      email: cliente.email,
      pais: cliente.pais,
      direccion: cliente.direccion,
      activo: cliente.activo,
      destino_orden: cliente.destino_orden,
      notify_address: cliente.notify_address,
      notify: cliente.notify,
      telefono: cliente.telefono
    }
    return this.http.post(url, cliente);
  }

  updateCliente(cliente: Cliente){
    const url = ApiCliente.actualizar_cliente_by_id+`${cliente.id_cliente}/`;
    const body ={
      nombre: cliente.nombre,
      email: cliente.email,
      pais: cliente.pais,
      direccion: cliente.direccion,
      activo: cliente.activo,
      destino_orden: cliente.destino_orden,
      notify_address: cliente.notify_address,
      notify: cliente.notify,
      telefono: cliente.telefono
    }
    return this.http.put(url, cliente);

  }

  getPackinglist(id_cliente: number){
    const url  =  ApiDocumentos.obtener_packinglist_cliente+`${id_cliente}/`;
    return this.http.get(url); 
  }

  getInvoice(id_cliente: number){
    const url  =  ApiDocumentos.obtener_facturas_cliente+`${id_cliente}/`;
    return this.http.get(url); 

  }
  updatePackingList(id_packing: number, data: any){
    const url = ApiDocumentos.actualizar_info_packinglist +`${id_packing}/`;
    return this.http.put(url,data);
  }
  updateEstadoInvoice(id_invoice:number, estado: boolean){
    const url = ApiDocumentos.actualizar_estado_factura+`${id_invoice}/`;
    const body = {
      "estado": estado
    }
    return this.http.put(url,body);
  }
  updatePrecio(id_invoice:number, precio: number){
    const url = ApiDocumentos.actualizar_item_factura+`${id_invoice}/`;
    const body = {
      "precio_caja": precio
    }
    return this.http.put(url,body);
  }
  updateFactura(id_invoice:number,data:any){
    const url = ApiDocumentos.actualizar_info_factura+`${id_invoice}/`;
    return this.http.put(url,data);

  }


}
