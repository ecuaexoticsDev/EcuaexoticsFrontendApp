import { Route } from '@angular/compiler/src/core';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../services/LocalStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private localStorageService: LocalStorageService) {}
  /**
   * 
   * @param route ruta definida por el tipo de usuario
   * @returns retorna un booleano para la autorizacion
   */
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const token = this.localStorageService.getToken();
    return this.localStorageService.validarToken(token);
  }
  // tslint:disable-next-line: typedef
   /**
   * 
   * @param route ruta definida por el tipo de usuario
   * @returns retorna un booleano para la autorizacion
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = this.localStorageService.getToken();
    return this.localStorageService.validarToken(token);
  }
}
