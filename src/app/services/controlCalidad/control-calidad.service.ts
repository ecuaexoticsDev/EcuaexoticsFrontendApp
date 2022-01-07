import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiControl } from 'src/app/config/api-control-calidad';

@Injectable({
  providedIn: 'root',
})
export class ControlCalidadService {
  constructor(private http: HttpClient) {}

  guardarControl(data: FormData) {
    const url = ApiControl.crear_control_calidad;
    return this.http.post(url, data);
  }

  getControl(id: any) {
    const url = ApiControl.get_info_control_calidad + id + '/';
    return this.http.get(url);
  }
}
