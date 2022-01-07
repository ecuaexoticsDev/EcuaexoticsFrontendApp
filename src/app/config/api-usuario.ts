import { environment } from 'src/environments/environment';

const APIUSUARIO = 'usuario/';
const LINKROOT = environment.base_url;

export const ApiUsuario = {
  login: LINKROOT + APIUSUARIO + 'login/',
  obtener_usuarios: LINKROOT + APIUSUARIO +'users/',
  crear_usuario: LINKROOT + APIUSUARIO + 'users/',
  actualizar_usuario: LINKROOT + APIUSUARIO + 'users-detalle/',
  eliminar_usuario: LINKROOT + APIUSUARIO + 'users-detalle/'
};
