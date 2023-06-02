import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "../services/LocalStorage/local-storage.service";

@Injectable({
  providedIn: "root",
})
export class BodegaGuard implements CanActivate {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  /**
   * Verifica si el usuario tiene permisos para acceder a la ruta.
   * @param route ruta definida por el tipo de usuario
   * @returns {boolean} retorna un booleano para la autorizacion
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const role = this.localStorageService.getUserLocalStorage()?.rol;
    if (role === "Operador_bodega") {
      return true;
    } else {
      this.router.navigateByUrl("login");
      this.localStorageService.removeLocalStorageTokens();
      this.localStorageService.removeLocalStorageUser();
      return false;
    }
  }
}
