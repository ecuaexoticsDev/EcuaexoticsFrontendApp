import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/LocalStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  /**
   * 
   * @param route ruta definida por el tipo de usuario
   * @returns retorna un booleano para la autorizacion
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const role = this.localStorageService.getUserLocalStorage()?.rol;

    if (role === 'Admin') {
      return true;
    } else {
      this.router.navigateByUrl('login');
      this.localStorageService.removeLocalStorageTokens();
      this.localStorageService.removeLocalStorageUser();
      return false;
    }
  }
}
