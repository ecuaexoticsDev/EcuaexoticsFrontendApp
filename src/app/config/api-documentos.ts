import { environment } from 'src/environments/environment';

const APIDOCUMENTOS = 'documentos/';
const LINKROOT = environment.base_url;

export const ApiDocumentos = {
    obtener_packinglist_cliente: LINKROOT + APIDOCUMENTOS +'obtener_packinglist_cliente/',
    obtener_facturas_cliente: LINKROOT + APIDOCUMENTOS + 'obtener_facturas_cliente/',
    actualizar_info_packinglist: LINKROOT + APIDOCUMENTOS +  'actualizar_info_packinglist/',
    actualizar_item_factura: LINKROOT +  APIDOCUMENTOS + 'actualizar_item_factura/',
    actualizar_info_factura: LINKROOT + APIDOCUMENTOS + 'actualizar_info_factura/',
    actualizar_estado_factura : LINKROOT + APIDOCUMENTOS + 'actualizar_estado_factura/'
};