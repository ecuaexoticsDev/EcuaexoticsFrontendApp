import { environment } from 'src/environments/environment';

const APITRANSPORTE = 'recepcion/';
const LINKROOT = environment.base_url;

export const ApiTransporte = {
  obtener_transportes: LINKROOT + APITRANSPORTE + 'transporte/',
  obtener_transporte_id: LINKROOT + APITRANSPORTE + 'transporte-detalle/',
  crear_transportes: LINKROOT + APITRANSPORTE + 'transporte/',
  actualizar_transportes: LINKROOT + APITRANSPORTE + 'transporte-detalle/',
  obtener_camiones: LINKROOT + APITRANSPORTE + 'transporte-unidad/',
  obtener_camiones_by_id_transporte: LINKROOT + APITRANSPORTE + 'transporte-unidades/',
  crear_camiones: LINKROOT + APITRANSPORTE + 'transporte-unidad/',
  obtener_camiones_by_id: LINKROOT + APITRANSPORTE + 'transporte-unidad-detalle/',
  actualizar_camion: LINKROOT + APITRANSPORTE + 'transporte-unidad-detalle/',
};
