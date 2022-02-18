import { environment } from 'src/environments/environment';

const APIRECEPCION = 'recepcion/';
const LINKROOT = environment.base_url;

export const  ApiRecepcion = {
  crear_recepcion: LINKROOT + APIRECEPCION + 'recepcion_transporte/',
  obtener_recepciones: LINKROOT + APIRECEPCION + 'range_date/',
  update_recepcion: LINKROOT + APIRECEPCION + 'update_recepcion/',
  obtener_recepciones_by_transporte: LINKROOT + APIRECEPCION + 'by_transporte/',
  obtener_recepcion_by_id: LINKROOT + APIRECEPCION + 'by_id/',
  
};
