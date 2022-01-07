import { environment } from 'src/environments/environment';

const APICLIENTE = 'cliente/';
const LINKROOT = environment.base_url;

export const ApiCliente = {
    
    obtener_clientes_todos: LINKROOT + APICLIENTE +'obtener_clientes_todos/',
    obtener_clientes: LINKROOT + APICLIENTE + 'obtener_clientes/',
    obtener_cliente_by_id: LINKROOT + APICLIENTE + 'obtener_cliente_by_id/',
    guardar_cliente: LINKROOT + APICLIENTE + 'guardar_cliente/',
    actualizar_cliente_by_id: LINKROOT + APICLIENTE + 'actualizar_cliente_by_id/'

};
