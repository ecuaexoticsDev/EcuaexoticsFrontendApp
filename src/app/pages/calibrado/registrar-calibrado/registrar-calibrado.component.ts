import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";
import { FormControl, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { AppState } from "src/app/store/app.reducers";
import * as actions from "../../../store/actions";

import { CalibradoService } from "src/app/services/calibrado/calibrado.service";
import { LocalStorageService } from "src/app/services/LocalStorage/local-storage.service";
import { SolicitarConfirmacion } from "src/app/components/informationAlert";

import {
  faPlusCircle,
  faMinusCircle,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: "app-registrar-calibrado",
  templateUrl: "./registrar-calibrado.component.html",
  styleUrls: ["./registrar-calibrado.component.scss"],
})
export class RegistrarCalibradoComponent implements OnInit {
  cajas: any = [];
  id_bodega: number = 0;
  is_calibre: boolean = false;
  messageTitle: string = "";
  visibleErrorMessage: boolean = false;

  //icon FontAwesome
  faPlusCircle = faPlusCircle;
  faMinusCircle = faMinusCircle;
  faSave = faSave;

  isVisibleNewCalibre = false;

  txtInputCalibre: FormControl = this.getFormControl();
  txtInputCantidad: FormControl = this.getFormControl();

  tipo_caja: string = "";
  public colorFruta = "";
  public flag = true;

  constructor(
    private store: Store<AppState>,
    private calibradoService: CalibradoService,
    private route: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.hasOwnProperty("id_bodega")) {
        this.id_bodega = params["id_bodega"];
        this.messageTitle = "¿Desea continuar con el registro de los calibres?";
      }
      if (params.hasOwnProperty("is_calibre")) {
        this.is_calibre = params["is_calibre"];
        this.messageTitle =
          "¿Desea continuar con la actualizacion de los calibres?";
        this.store.dispatch(actions.resetCalibre());
        this.getCajasByBodega();
      }
      if (params.hasOwnProperty("tipo_fruta")) {
        this.colorFruta = params["tipo_fruta"];
      }
    });
    this.store.select("calibrados").subscribe(({ calibrado }) => {
      if (this.colorFruta == "Rose Dragon Fruit") {
        this.cajas = calibrado.filter(
          (caja) =>
            caja.tipo_caja != "Caja 10.9" &&
            caja.tipo_caja != "Caja 12.7" &&
            caja.tipo_caja != "Caja 14.5"
        );
      } else {
        this.cajas = calibrado;
      }
    });
  }

  /**
   * Obtiene las cajas segun el id de la bodega
   */
  getCajasByBodega() {
    this.calibradoService
      .getCajasCalibre(this.id_bodega)
      .subscribe((resp: any) => {
        this.store.dispatch(actions.reloadStateCalibre({ payload: resp }));
      });
  }

  getFormControl() {
    return new FormControl("", Validators.required);
  }

  sumarCalibre(tipo_caja: any, calibre: any) {
    this.store.dispatch(
      actions.sumarCalibre({ payload: { tipo_caja, calibre } })
    );
  }

  restarCalibre(tipo_caja: any, calibre: any) {
    this.store.dispatch(
      actions.restarCalibre({ payload: { tipo_caja, calibre } })
    );
  }

  /**
   * guarda los datos de los calibres en la base
   */
  async guardarCalibres() {
    const confirmacion = await SolicitarConfirmacion(this.messageTitle);

    if (confirmacion) {
      Swal.fire({
        title: "Guardando...",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const usuario = await this.localStorageService.getUserLocalStorage();
      const data = {
        calibrado: {
          id_usuario: usuario.id,
          id_bodega: this.id_bodega,
        },
        tipo_caja: this.cajas,
      };

      if (this.is_calibre) {
        this.calibradoService
          .actualizarCalibrado(data, this.id_bodega)
          .subscribe(
            (resp: any) => {
              Swal.close();
              this.messageSuccess(resp.message);
            },
            (error) => {
              Swal.close();
              this.messageError("No se ha podido crear los items calibre");
            }
          );
      } else {
        this.calibradoService.guardarCalibrado(data).subscribe(
          (resp: any) => {
            Swal.close();
            this.messageSuccess(resp.message);
          },
          (error) => {
            Swal.close();
            this.messageError("No se ha podido crear los items calibre");
          }
        );
      }
    }
  }

  messageSuccess(message: string) {
    this.store.dispatch(actions.resetCalibre());
    Swal.fire(message, "", "success");
    this.router.navigateByUrl("/calibrado/ver-calibrado");
  }

  messageError(message: string) {
    Swal.fire({
      icon: "error",
      title: "Error...",
      text: message,
    });
  }

  /**
   * muestra el modal para crear un nuevo calibre
   * @param {string} value asgina el tipo de caja a ese calibre
   */
  showModal(value: string): void {
    this.tipo_caja = value;
    this.isVisibleNewCalibre = true;
  }

  validateMinCalibre(event: any) {
    if (event) {
      if (this.tipo_caja == "Caja 2.5") {
        if (event > 14) {
          this.visibleErrorMessage = false;
        } else {
          this.visibleErrorMessage = true;
        }
      } else if (this.tipo_caja == "Caja 4") {
        if (event > 18) {
          this.visibleErrorMessage = false;
        } else {
          this.visibleErrorMessage = true;
        }
      } else if (this.tipo_caja == "Caja 4.5") {
        if (event > 18) {
          this.visibleErrorMessage = false;
        } else {
          this.visibleErrorMessage = true;
        }
      }
    }
  }

  /**
   * maneja la creacion de los nuevos calibres
   * @returns {void} hace visible el nuevo calibre en la lista
   */
  handleOk() {
    if (this.txtInputCalibre.invalid || this.txtInputCantidad.invalid) {
      return;
    }
    if (this.visibleErrorMessage) {
      return;
    }
    const payload = {
      calibre: this.txtInputCalibre.value,
      cantidad: this.txtInputCantidad.value,
      tipo_caja: this.tipo_caja,
    };
    this.store.dispatch(actions.agregarCalibre({ payload }));
    this.txtInputCalibre.reset();
    this.txtInputCantidad.reset();
    this.isVisibleNewCalibre = false;
  }

  handleCancel(): void {
    this.isVisibleNewCalibre = false;
  }
}
