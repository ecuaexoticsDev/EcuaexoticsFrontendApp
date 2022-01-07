import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiUsuario } from '../config/api-usuario';
import { Usuario } from '../models/usuarios';
import { LocalStorageService } from './LocalStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  

  constructor(private http: HttpClient, private local: LocalStorageService) { }

  public options = {
    headers: new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `${this.local.getToken()}`,
    }),
  };
  
  getUsuarios(){
    const url = ApiUsuario.obtener_usuarios;
    return this.http.get(url);
  }

  actualizarUsuario(usuario: Usuario){

    const url = ApiUsuario.actualizar_usuario+`${usuario.id}/`;
    if(usuario.password===' '){
      const body = {
        email: usuario.email,
        username: usuario.username,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
        is_active: usuario.is_active
      }
      return this.http.put(url,body);
    }else{
      const body = {
        email: usuario.email,
        username: usuario.username,
        password: usuario.password,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
        is_active: usuario.is_active
      }
      return this.http.put(url,body);

    }   
  }

  crearUsuario(usuario: Usuario){
    
    const url = ApiUsuario.crear_usuario;
    const body = {
        email: usuario.email,
        password: usuario.password,
        username: usuario.username,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
        is_active: "true"
    }
    return this.http.post(url, body);

  }
  
}
