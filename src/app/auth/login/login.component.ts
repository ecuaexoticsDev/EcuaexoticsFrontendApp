import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import {
  faSignInAlt,
  faEye,
  faEyeSlash,
  faQuoteLeft,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";

import Swal from "sweetalert2";

import { AuthService } from "src/app/services/auth/auth.service";
import { LocalStorageService } from "src/app/services/LocalStorage/local-storage.service";
import { MenuService } from "../../services/menu/menu.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public faSignInAlt = faSignInAlt;
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  public faQuoteLeft = faQuoteLeft;
  public faQuoteRight = faQuoteRight;
  public nameIcon = this.faEye;
  public showPassword = false;

  public loginForm: FormGroup = this.initForm();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private localStorageService: LocalStorageService
  ) {
    this.localStorageService.validateSesion();
    this.initForm();
  }

  ngOnInit(): void {}

  initForm(): FormGroup {
    return this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  /**
   * Verifica las credenciales del usuario y permite el acceso
   * @returns {void}
   */
  login(): void {
    const { email, password } = this.loginForm.value;
    const dataForm = {
      email,
      password,
    };
    Swal.fire({
      title: "Autenticando...",
      didOpen: () => {
        Swal.showLoading();
      },
    });
    this.authService.login(dataForm).subscribe(
      (resp: any) => {
        const { data } = resp;
        this.localStorageService.setUserLocalStorage(data.information);
        this.localStorageService.setTokenLocalStorage(data.tokens);

        if (data.information.rol === "Operador_bodega") {
          this.router.navigateByUrl("/bodega/ver-bitacoras");
        } else if (data.information.rol === "Operador_calibrado") {
          this.router.navigateByUrl("calibrado/ver-calibrado");
        } else if (data.information.rol === "Operador_palletizado") {
          this.router.navigateByUrl("palletizado/control-palletizado");
        } else if (data.information.rol === "Admin") {
          this.router.navigateByUrl("/");
        }

        Swal.close();
      },
      (err) => {
        Swal.fire("Error", "Sucedido un Error Inesperado", "error");
      }
    );
  }

  /**
   * Permite cambiar el icono de mostrar u ocultar password en el form
   * @returns {void}
   */
  togglePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.nameIcon === this.faEye) {
      this.nameIcon = this.faEyeSlash;
    } else {
      this.nameIcon = this.faEye;
    }
  }
}
