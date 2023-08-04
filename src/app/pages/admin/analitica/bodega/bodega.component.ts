import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { itemPallet } from "src/app/interfaces/itemPallet.interface";
import { Productor } from "src/app/models/productor";
import { CalibradoService } from "src/app/services/calibrado/calibrado.service";
import { PalletizadoService } from "src/app/services/palletizado/palletizado.service";
import { ProductoresService } from "src/app/services/productores/productores.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-bodega",
  templateUrl: "./bodega.component.html",
  styleUrls: ["./bodega.component.scss"],
})
export class BodegaComponent implements OnInit {
  public cajasDisponibles: any[] = [];
  public pitahaya: string[] = [
    "Yellow Dragon Fruit",
    "Red Dragon Fruit",
    "Rose Dragon Fruit",
  ];
  public tiposCaja: string[] = [
    "Carton Box 2.5 kg net weight",
    "Carton Box 4 kg net weight",
    "Carton Box 4.5 kg net weight",
    "Carton Box 10.9 kg net weight",
    "Carton Box 12.7 kg net weight",
    "Carton Box 14.5 kg net weight",
  ]; //Carton Box 12.7 kg net weight
  public calibres: { [calibre: string]: number } = {};
  public claves: string[] = [];
  public cargando = false;

  public filtroForm: FormGroup = this.fb.group({
    tipo_pitahaya: [null, Validators.required],
    tipo_caja: [null, Validators.required],
  });

  constructor(
    private calibradoService: CalibradoService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  async obtenerCajas(tipo_pitahaya: string, tipo_caja: string): Promise<void> {
    this.cargando = true;
    try {
      const resp: any = await this.calibradoService
        .obtenerCajasbyPitahaya(tipo_pitahaya)
        .toPromise();
      resp.forEach((element: any) => {
        element.tipo_caja.forEach((tipoCajas: any) => {
          if (tipoCajas.tipo === tipo_caja) {
            this.cargarCalibres(tipoCajas.cajas);
          }
        });
      });
    } catch (error) {
      Swal.fire(
        "Sucedio un Error Inesperado",
        "Error al obtener cajas ",
        "error"
      );
      //throw new Error("Error al obtener cajas: ");
    }
  }

  /**
   * Obtiene los calibre disponibles
   * @param {string} cajas tipo de caja
   * @returns {void}
   */
  cargarCalibres(cajas: []): void {
    //const diccionario: { [calibre: string]: number } = {};
    if (cajas.length !== 0) {
      cajas.forEach((element: any) => {
        var calibre = element.calibre;
        var inventario = element.inventario;
        // Si el calibre aún no está en el diccionario, lo agrega con el inventario actual
        // Si el calibre ya existe, suma el inventario actual al inventario existente
        this.calibres[calibre] = (this.calibres[calibre] || 0) + inventario;
      });
    }
  }

  /**
   * Envia la informacion del formulario a la base de datos
   * @returns {void}
   */
  async submitForm(): Promise<void> {
    if (this.filtroForm.invalid) {
      for (const i in this.filtroForm.controls) {
        this.filtroForm.controls[i].markAsDirty();
        this.filtroForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    this.calibres = {};
    try {
      await this.obtenerCajas(
        this.filtroForm.controls["tipo_pitahaya"].value,
        this.filtroForm.controls["tipo_caja"].value
      );
      this.cargando = false;
      this.claves = [];
      this.claves = Object.keys(this.calibres);
      //this.isVisible = false;
      //this.filtroForm.reset();
    } catch (error) {
      // Manejar el error aquí (mostrar un mensaje de error, etc.)
      console.error("Error al obtener cajas:", error);
    }
  }
}
