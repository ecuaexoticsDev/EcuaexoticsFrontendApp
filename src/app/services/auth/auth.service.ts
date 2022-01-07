import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiUsuario } from 'src/app/config/api-usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data: any) {
    const url = ApiUsuario.login;
    return this.http.post(url, data);
  }
}
