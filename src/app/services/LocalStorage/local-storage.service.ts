import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  helper: any;
  constructor(private router: Router) {
    this.helper = new JwtHelperService();
  }

  /**
   * Permite guardar en el local storage el conjunto de tokens
   * @param {any} rawToken json que contiene el access token y refresh token
   */
  setTokenLocalStorage(rawToken: any) {
    const tokens = {
      token: rawToken.access,
      refresh: rawToken.refresh,
    };
    localStorage.setItem("tokens", JSON.stringify(tokens));
  }

  /**
   * Permite obtener del local storage el token
   * @returns {any} valor del access token
   */
  getToken() {
    const localS = localStorage.getItem("tokens") || "";

    if (localS !== "") {
      const tokens = JSON.parse(localS);
      if (tokens) {
        return tokens.token;
      }
      return tokens;
    }
  }

  /**
   * Permite obtener del local storage el token
   * @returns {any} valor del refresh token
   */
  getRefreshToken() {
    const tokens = JSON.parse(localStorage.getItem("tokens") || "");
    if (tokens) {
      return tokens.refresh;
    }
    return tokens;
  }

  /**
   * Esta funcion permite guardar los datos del usuarios en el local storage
   * @param {any} information datos del usuario
   */
  setUserLocalStorage(information: any) {
    const user = {
      id: information.id,
      username: information.username,
      nombre: information.nombre,
      apellido: information.apellido,
      email: information.email,
      rol: information.rol,
    };
    localStorage.setItem("userInformation", JSON.stringify(user));
  }

  /**
   * Esta funcion permite obtener del local storage los datos del usuario
   * @returns {any} datos del usuario
   */
  getUserLocalStorage() {
    const dataUser = localStorage.getItem("userInformation") || "";
    if (dataUser !== "") {
      const user = JSON.parse(dataUser);
      return user;
    }
  }

  /**
   * Permite decodificar el token
   * @param {any} token cadena de texto
   * @returns {any} el token decodificado por jwt
   */
  decodeToken(token: any) {
    const decodedToken = this.helper.decodeToken(token);
    return decodedToken;
  }

  /**
   * Permite saber si el token ya caduno o o no
   * @param {string} token cadena de texto
   * @returns {any} valor booleano de si el token ya expiro o no
   */
  isExpiredToken(token: string) {
    const isExpired = this.helper.isTokenExpired(token);
    return isExpired;
  }

  /**
   * Permite calcular el tiempo en  milisegundos que falta para que caduque un token
   * @param {string} token cadena de texto
   * @returns {any} tiempo de vida del token
   */
  expirationDateToken(token: string) {
    const expirationDate = this.helper.getTokenExpirationDate(token);
    return expirationDate;
  }

  /**
   * Elimina del local storage el conjunto de tokens
   */
  removeLocalStorageTokens() {
    localStorage.removeItem("tokens");
  }

  /**
   * Elimina del local storage los datos del usuario
   */
  removeLocalStorageUser() {
    localStorage.removeItem("userInformation");
  }

  /**
   * valida el token del usuario
   * @param {string} token
   * @returns {boolean} responde con un booleano a la validacion del token
   */
  validarToken(token: string) {
    if (!this.isExpiredToken(token) || this.getToken() !== "") {
      return true;
    } else {
      this.router.navigateByUrl("/login");

      return false;
    }
  }

  validateSesion() {
    if (!this.getToken()) {
      return;
    } else {
      if (!this.isExpiredToken(this.getToken())) {
        const data = this.getUserLocalStorage();
        if (data.rol === "Operador_bodega") {
          this.router.navigateByUrl("/bodega/ver-bitacoras");
        } else if (data.rol === "Operador_calibrado") {
          this.router.navigateByUrl("calibrado/ver-calibrado");
        } else if (data.rol === "Operador_palletizado") {
          this.router.navigateByUrl("palletizado/control-palletizado");
        } else if (data.rol === "Admin") {
          this.router.navigateByUrl("/");
        }
      }
    }
  }
}
