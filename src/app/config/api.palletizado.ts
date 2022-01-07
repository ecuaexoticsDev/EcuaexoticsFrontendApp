import { environment } from 'src/environments/environment';

const APIPALLETIZADO = 'palletizado/';
const LINKROOT = environment.base_url;

export const ApiPalletizado = {
  crear_palletizado: LINKROOT + APIPALLETIZADO + 'crear_palletizado/',
  crear_pallet: LINKROOT + APIPALLETIZADO + 'crear_pallet/',
  crear_item_pallet: LINKROOT + APIPALLETIZADO + 'crear_item_pallet/',
  obtener_pallets: LINKROOT + APIPALLETIZADO + 'obtener_pallets/',
  obtener_items_pallet: LINKROOT + APIPALLETIZADO + 'obtener_items_pallet/',
  actualizar_cliente_pallet: LINKROOT + APIPALLETIZADO + 'actualizar_cliente_pallet/',
  eliminar_item_pallet: LINKROOT + APIPALLETIZADO + 'eliminar_item_pallet/',
  get_final_palletizado: LINKROOT + APIPALLETIZADO + 'get_final_palletizado/',
  final_palletizado_state_open : LINKROOT + APIPALLETIZADO + 'final_palletizado_state_open/',
  finalizar_palletizado: LINKROOT + APIPALLETIZADO + 'finalizar_palletizado/',
};
