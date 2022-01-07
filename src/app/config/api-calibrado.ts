import { environment } from 'src/environments/environment';

const APICALIBRADO = 'calibrado/';
const LINKROOT = environment.base_url;

export const ApiCalibrado = {
  crear_calibrado: LINKROOT + APICALIBRADO + 'crear_calibrado/',
  actualizar_calibrado: LINKROOT + APICALIBRADO + 'actualizar_calibrado/',
  obtener_cajas: LINKROOT + APICALIBRADO + 'obtener_cajas/',
  obtener_cajas_disponibles: LINKROOT + APICALIBRADO + 'cajas_disponibles/',
  obtener_liquidaciones: LINKROOT+APICALIBRADO +'obtener_liquidaciones/',
  actualizar_item_liquidacion: LINKROOT + APICALIBRADO + 'actualizar_item_liquidacion/',
  actualizar_info_liquidacion: LINKROOT + APICALIBRADO +  'actualizar_info_liquidacion/',
  actualizar_estado_liquidacion: LINKROOT + APICALIBRADO + 'actualizar_estado_liquidacion/',

};
