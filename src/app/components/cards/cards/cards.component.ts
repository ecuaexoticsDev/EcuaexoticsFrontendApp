import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { itemPallet } from "src/app/interfaces/itemPallet.interface";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Productor } from "src/app/models/productor";
import { CalibradoService } from "../../../services/calibrado/calibrado.service";
import { PalletizadoService } from "../../../services/palletizado/palletizado.service";
import { LocalStorageService } from "src/app/services/LocalStorage/local-storage.service";
import Swal from "sweetalert2";
import { logging } from "protractor";

@Component({
  selector: "app-cards",
  templateUrl: "./cards.component.html",
  styleUrls: ["./cards.component.scss"],
})
export class CardsComponent implements OnInit {
  @Input() id: number = 0;
  @Input() id_pallet: number = 0;
  @Input() tipo_pallet?: string = "";

  public cajasDisponibles: any[] = [];
  public cajas: itemPallet[] = [];
  public productores: Productor[] = [];
  public tiposCaja: string[] = [];
  public calibres: string[] = [];
  public isLoadingOne = false;
  public isVisible = false;
  public id_usuario: number = 0;
  public inventario: number = 0;
  public id_caja: number = 0;
  public palletForm: FormGroup = this.fb.group({
    productor: [null, Validators.required],
    tipo_caja: [null, Validators.required],
    calibre: [
      null,
      [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ],
    ],
    num_cajas: [
      "",
      [
        Validators.required,
        Validators.minLength(1),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/),
      ],
    ],
  });

  constructor(
    private rotuer: Router,
    private fb: FormBuilder,
    private calibradoService: CalibradoService,
    private palletizadoService: PalletizadoService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.cargarItems();
  }

  /**
   * Permite añadir un item al arreglo de items
   * asginados a un pallet especifico.
   * @returns {void}
   */
  agregarItem() {
    this.id_usuario = this.localStorageService.getUserLocalStorage().id;
    const id: number = this.cajas.length;
    const item: itemPallet = {
      id_item_pallet: id,
      id_Pallet: this.id_pallet,
      id_caja: this.id_caja,
      ...this.palletForm.value,
    };

    this.palletizadoService.crearItemPallet(item, this.id_usuario).subscribe(
      (resp: any) => {
        this.cajas.push(item);
        localStorage.setItem(`Pallet${this.id}`, JSON.stringify(this.cajas));
        Swal.fire("Exito", "Item agregado", "success");
      },
      (error) => {
        Swal.fire("Error", "Sucedio un Error Inesperado", "error");
      }
    );
  }

  /**
   * Obtiene los items de cada pallet de la base de datos
   * @return {void}
   */
  cargarItems() {
    this.palletizadoService.getItems(this.id_pallet).subscribe((resp: any) => {
      this.cajas = resp;
      //console.log(resp);
    });
  }

  /**
   * Obtiene las cajas disponibles desde la recepcion de gavetas
   * @return {void}
   */
  obtenerCajas() {
    this.calibradoService.obtenerCajas(this.id_pallet).subscribe(
      (resp: any) => {
        //console.log(resp);
        this.cajasDisponibles = resp;
        this.isVisible = true;
        this.isLoadingOne = false;
        this.cargarProductores();
      },
      (error) => {
        Swal.fire("Error", "No se pudieron Cargar los Datos", "error");
      }
    );
  }

  /**
   * Obtiene los productores desde la base de datos
   * @returns {void}
   */
  cargarProductores() {
    if (this.cajasDisponibles.length === 0) {
      Swal.fire("Error", "No se pudieron Cargar los Datos", "error");
      return;
    } else if (this.productores.length !== 0) {
      return;
    } else {
      this.cajasDisponibles.forEach((element) => {
        this.productores.push(element.productor);
      });
    }
  }

  /**
   * Carga el tipo de caja disponible desde la recepcion
   * @param {Productor} data productor sobre el cual se hace la busqueda
   * @return {void}
   */
  cargarTipoCajas(data: Productor): void {
    this.tiposCaja = [];
    this.palletForm.controls["tipo_caja"].setValue(null);
    if (data !== null) {
      this.cajasDisponibles.forEach((element) => {
        if (element.productor.id_productor === data.id_productor) {
          element.tipo_caja.forEach((caja: any) => {
            if (caja.cajas.length != 0) {
              this.tiposCaja.push(caja.tipo);
            }
          });
        }
      });
    }
  }

  /**
   * Obtiene los calibre disponibles
   * @param {string} data tipo de caja
   * @returns {void}
   */
  cargarCalibres(data: string): void {
    this.calibres = [];
    const id_prod = this.palletForm.controls["productor"].value;
    if (data !== null) {
      this.cajasDisponibles.forEach((element) => {
        if (element.productor.id_productor === id_prod.id_productor) {
          element.tipo_caja.forEach((caja: any) => {
            if (caja.tipo === data) {
              caja.cajas.forEach((item: any) => {
                if (!this.calibres.includes(item.calibre)) {
                  this.calibres.push(item.calibre);
                }
              });
            }
          });
        }
      });
    }
  }

  /**
   * carga el inventario de las cajas disponibles
   * @param {string} data identifica el calibre de la fruta
   * @returns {void}
   */
  cargarInventario(data: string) {
    this.inventario = 0;
    const id_prod = this.palletForm.controls["productor"].value;
    const tipo = this.palletForm.controls["tipo_caja"].value;
    if (data !== null) {
      this.cajasDisponibles.forEach((element) => {
        if (element.productor.id_productor === id_prod.id_productor) {
          element.tipo_caja.forEach((caja: any) => {
            if (caja.tipo === tipo) {
              caja.cajas.forEach((item: any) => {
                if (item.calibre === data) {
                  this.id_caja = item.id_caja;
                  this.inventario = item.inventario;
                }
              });
            }
          });
        }
      });
    }
  }

  verItems() {
    this.rotuer.navigate(["/palletizado/ver-palletizado", this.id_pallet]);
  }

  /**
   * muestra el modal para agregar las cajas al pallet
   */
  showModal(): void {
    this.isLoadingOne = true;
    this.obtenerCajas();
  }

  handleCancel(): void {
    this.isVisible = false;
    this.palletForm.reset();
  }

  /**
   * Envia la informacion del formulario a la base de datos
   * @returns {void}
   */
  submitForm(): void {
    if (this.palletForm.invalid) {
      for (const i in this.palletForm.controls) {
        this.palletForm.controls[i].markAsDirty();
        this.palletForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    this.agregarItem();
    this.isVisible = false;
    this.palletForm.reset();
  }
}
