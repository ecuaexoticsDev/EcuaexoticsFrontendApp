import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ApiUsuario } from "../config/api-usuario";
import { Usuario } from "../models/usuarios";
import { LocalStorageService } from "./LocalStorage/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class UsuariosService {
  constructor(private http: HttpClient, private local: LocalStorageService) {}

  public options = {
    headers: new HttpHeaders({
      Accept: "application/json",
      Authorization: `${this.local.getToken()}`,
    }),
  };

  /**
   * Obtiene todos los usuarios registrados en el sistema.
   * @returns {Observable<any>} - Un Observable que emite un array de todos los usuarios.
   */
  getUsuarios() {
    const url = ApiUsuario.obtener_usuarios;
    return this.http.get(url);
  }

  /**
   * Actualiza la información de un usuario existente.
   * @param {Usuario} usuario El objeto Usuario con los datos actualizados.
   * @returns {Observable<any>} -  Un Observable que indica si la actualización fue exitosa.
   */
  actualizarUsuario(usuario: Usuario) {
    const url = ApiUsuario.actualizar_usuario + `${usuario.id}/`;
    if (usuario.password === " ") {
      const body = {
        email: usuario.email,
        username: usuario.username,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
        is_active: usuario.is_active,
      };
      return this.http.put(url, body);
    } else {
      const body = {
        email: usuario.email,
        username: usuario.username,
        password: usuario.password,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
        is_active: usuario.is_active,
      };
      return this.http.put(url, body);
    }
  }
  /**
   * crea un usuario nuevo en la base de datos
   * @param {Usuario} usuario
   * @returns {Observable<any>} - Un Observable con la respuesta del servidor
   */
  crearUsuario(usuario: Usuario) {
    const url = ApiUsuario.crear_usuario;
    const body = {
      email: usuario.email,
      password: usuario.password,
      username: usuario.username,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol,
      is_active: "true",
    };
    return this.http.post(url, body);
  }
}
