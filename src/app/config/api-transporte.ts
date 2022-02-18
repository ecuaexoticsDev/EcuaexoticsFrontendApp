import { environment } from 'src/environments/environment';

const APITRANSPORTE = 'recepcion/';
const LINKROOT = environment.base_url;

export const ApiTransporte = {
  obtener_transportes: LINKROOT + APITRANSPORTE + 'transporte/',
  obetner_transporte_id: LINKROOT + APITRANSPORTE + 'transporte-detalle/',
  crear_transportes: LINKROOT + APITRANSPORTE + 'transporte/',
  actualizar_transportes: LINKROOT + APITRANSPORTE + 'transporte-detalle/',
};
