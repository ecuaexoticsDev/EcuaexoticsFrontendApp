import { environment } from 'src/environments/environment';

const APIBODEGA = 'bodega/';
const LINKROOT = environment.base_url;

export const ApiBodega = {
  obtener_todas_bitacoras: LINKROOT + APIBODEGA + 'obtener_todas_bitacoras/',
  obtener_bitacoras_reciente : LINKROOT + APIBODEGA +'obtener_bitacoras/',
  obtener_bitacoras_by_productor: LINKROOT + APIBODEGA + 'obtener_bitacoras_by_productor/',
  obtener_bitacoras_by_Id: LINKROOT + APIBODEGA + 'obtener_Bitacora_by_id/',
};
