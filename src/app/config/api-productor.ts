import { environment } from 'src/environments/environment';

const APIPRODUCTOR = 'productor/';
const LINKROOT = environment.base_url;

export const ApiProductor = {

    obtener_productores_todos: LINKROOT + APIPRODUCTOR + 'obtener_productores_todos/',
    obtener_productores: LINKROOT + APIPRODUCTOR + 'obtener_productores/',
    actualizar_productor_by_id: LINKROOT + APIPRODUCTOR +'actualizar_productor_by_id/',
    obtener_productor_by_id: LINKROOT + APIPRODUCTOR + 'obtener_productor_by_id/',
    guardar_productor: LINKROOT + APIPRODUCTOR + 'guardar_productor/',
    
    
};
