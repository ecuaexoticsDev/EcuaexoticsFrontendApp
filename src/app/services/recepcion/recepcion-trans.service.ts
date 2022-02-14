import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiRecepcion } from 'src/app/config/api-recepcion';

@Injectable({
  providedIn: 'root'
})
export class RecepcionTransService {

  constructor(private http: HttpClient) { }

  guardarRecepcion(data: FormData) {
    const url = ApiRecepcion.crear_recepcion;
    return this.http.post(url, data);
  }
}
