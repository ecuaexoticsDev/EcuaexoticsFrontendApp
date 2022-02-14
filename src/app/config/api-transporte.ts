import { environment } from 'src/environments/environment';

const APITRANSPORTE = 'recepcion/';
const LINKROOT = environment.base_url;

export const ApiTrasnporte = {
  obtener_transportes: LINKROOT + APITRANSPORTE + 'transporte/',
  crear_transportes: LINKROOT + APITRANSPORTE + 'transporte/',
  actualizar_transportes: LINKROOT + APITRANSPORTE + 'transporte-detalle/',
};
