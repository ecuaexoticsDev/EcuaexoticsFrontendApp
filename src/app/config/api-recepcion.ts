import { environment } from 'src/environments/environment';

const APIRECEPCION = 'recepcion/';
const LINKROOT = environment.base_url;

export const  ApiRecepcion = {
  crear_recepcion: LINKROOT + APIRECEPCION + 'recepcion_transporte/',
  
};
