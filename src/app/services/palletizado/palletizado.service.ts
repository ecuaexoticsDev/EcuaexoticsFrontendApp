import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { palletizado } from 'src/app/interfaces/palletizado.interface';
import { ApiPalletizado } from '../../config/api.palletizado';
import { pallet } from 'src/app/interfaces/Pallet.interface';
import { itemPallet } from 'src/app/interfaces/itemPallet.interface';
import { UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PalletizadoService {

  constructor(private http: HttpClient) { }

  crearPalletizado(id_usuario: number ){
    const url = ApiPalletizado.crear_palletizado;
    const body ={
      id_usuario: id_usuario
    }
    return this.http.post(url, body);
  }

  crearPallet(pallet: pallet ){
    const url = ApiPalletizado.crear_pallet;
    const body ={
      tipo_pitahaya: pallet.tipo_pitahaya,
      id_cliente: pallet.id_cliente ,
      id_palletizado: pallet.id_palletizado ,  
    }
    return this.http.post(url, body);
  }

  crearItemPallet(itemPallet: itemPallet, id_usuario: number ){
    const url = ApiPalletizado.crear_item_pallet;
    const body = {
      tipo_caja: itemPallet.tipo_caja,
      num_cajas: itemPallet.num_cajas,
      calibre: itemPallet.calibre,
      id_pallet: itemPallet.id_Pallet,
      id_productor: itemPallet.productor.id_productor,
      id_usuario: id_usuario,
      id_caja: itemPallet.id_caja 
    }
    return this.http.post(url, body);
  }

  getPalletizado(){
    const url =  ApiPalletizado.get_final_palletizado;
    return this.http.get(url);
  }

  getPalletActivo(){
    const url = ApiPalletizado.final_palletizado_state_open;
    return this.http.get(url);
  }

  getpallets(id_palletizado: number){
    const url = ApiPalletizado.obtener_pallets+ `${id_palletizado}/`;
    return this.http.get(url);
  }
  getItems(id_pallet: number){
    const url = ApiPalletizado.obtener_items_pallet+`${id_pallet}/`;
    return this.http.get(url);
  }

  actualizarCliente(id_pallet: number, id_cliente: number){
    const url = ApiPalletizado.actualizar_cliente_pallet+`${id_pallet}/`;
    const body = {
      id_cliente: id_cliente
    }
    return this.http.put(url,body);
  }

  eliminarItem(id_item_pallet: number){
    const url = ApiPalletizado.eliminar_item_pallet+`${id_item_pallet}/`;
    return this.http.delete(url);
  }

  finalizarPalletiazado(id_palletizado: number){
    const url = ApiPalletizado.finalizar_palletizado+`${id_palletizado}/`;
    const body = {
      'estado': true
    }
    return this.http.put(url,body)

  }

}
