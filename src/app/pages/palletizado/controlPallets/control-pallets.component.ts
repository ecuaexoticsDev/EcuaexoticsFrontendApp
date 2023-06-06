import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { pallet } from "src/app/interfaces/Pallet.interface";
import { Cliente } from "src/app/models/cliente";
import { ClientesService } from "../../../services/clientes/clientes.service";
import { palletizado } from "../../../interfaces/palletizado.interface";
import { Router } from "@angular/router";
import { PalletizadoService } from "../../../services/palletizado/palletizado.service";
import { LocalStorageService } from "../../../services/LocalStorage/local-storage.service";
import Swal from "sweetalert2";
import { SolicitarConfirmacion } from "src/app/components/informationAlert";
import { pipe } from "rxjs";

@Component({
  selector: "app-control-pallets",
  templateUrl: "./control-pallets.component.html",
  styleUrls: ["./control-pallets.component.scss"],
})
export class ControlPalletsComponent implements OnInit {
  public id_usuario: number = 0;
  public id_palletizado: number = 0;
  public palletizadoIds: any[] = [];
  // objetos para generar palletizado
  public palletizado?: palletizado; //opcional
  public pallets: pallet[] = [];
  // Listas para cargar modal de creacion de pallets
  public clientes: Cliente[] = [];
  public tiposPitajaya: string[] = [
    "Yellow Dragon Fruit",
    "Red Dragon Fruit",
    "Rose Dragon Fruit",
  ];
  public mostrarModal = false;
  public isVisible = false;
  public cargando = true;

  public palletForm: FormGroup = this.fb.group({
    cliente: [null, Validators.required],
    pitajaya: [" ", Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private clientesService: ClientesService,
    private router: Router,
    private palletizadoService: PalletizadoService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.cargarClientes();
    this.checkPalletInicio();
  }

  /**
   * verifica la existencia de un palletizado previo
   */
  checkPalletInicio() {
    this.palletizadoService.getPalletActivo().subscribe(
      (resp: any) => {
        if (resp.id_palletizado !== null) {
          this.id_palletizado = resp.id_palletizado;
          localStorage.setItem("id_palletizado", resp.id_palletizado);
          this.cargarPallets();
          this.isVisible = true;
        } else {
          this.isVisible = false;
          this.cargando = false;
        }
      },
      (error) => {
        Swal.fire(
          "Error",
          "Sucedio un error inesperado al obtener los datos del palletizado",
          "error"
        );
      }
    );
  }

  /**
   * controla el inicio del palletizado
   * @returns booleano maneja la visibilidad del modal para iniciar el palletizado
   */
  iniciarPalletizado() {
    const id_palletizadoLocal = localStorage.getItem("id_palletizado") || "";
    if (id_palletizadoLocal === "") {
      this.obtenerPalletizadoId();
      this.isVisible = true;
    } else {
      return;
    }
  }

  /**
   * obtiene el id del palletizado
   */
  obtenerPalletizadoId() {
    this.id_usuario = this.localStorageService.getUserLocalStorage().id;
    this.palletizadoService.crearPalletizado(this.id_usuario).subscribe(
      (resp: any) => {
        localStorage.setItem("id_palletizado", resp.id_palletizado);
        this.id_palletizado = resp.id_palletizado;
        Swal.fire("Exito", "Palletizado Iniciado", "success");
      },
      (error) => {
        Swal.fire("Error", "Sucedio un Error Inesperado", "error");
      }
    );
  }

  /**
   * carga los clientes disponibles en la base
   */
  cargarClientes() {
    this.clientesService.getClientes().subscribe((resp: any) => {
      this.clientes = resp;
    });
  }
  /**
   * crea los pallets en la base de datos
   * @param data datos del form
   */
  newPallet(data: FormGroup): void {
    const nuevoPallet: pallet = {
      id_pallet: 0,
      id_palletizado: this.id_palletizado,
      id_cliente: data.value.cliente.id_cliente,
      tipo_pitahaya: data.value.pitajaya,
      items: [],
    };
    this.palletizadoService.crearPallet(nuevoPallet).subscribe(
      (resp: any) => {
        nuevoPallet.id_pallet = resp.id_pallet;
        this.pallets.push(nuevoPallet);
        localStorage.setItem("pallets", JSON.stringify(this.pallets));
        Swal.fire("Exito", "Pallet creado con exito", "success");
      },
      (error) => {
        Swal.fire("Error", "Sucedio un Error Inesperado", "error");
      }
    );
  }
  /**
   * carga los pallets existentes en la base para ese paletizado segun el id
   * @return {void} todos los datos de ese pallet cargados
   */
  cargarPallets() {
    this.cargando = true;
    this.palletizadoService.getpallets(this.id_palletizado).subscribe(
      (resp: any) => {
        this.pallets = resp;
        this.cargando = false;
      },
      (error) => {
        Swal.fire("Error", "No se pudieron cargar los pallets", "error");
      }
    );
  }

  showModal(): void {
    this.mostrarModal = true;
  }

  handleCancel(): void {
    this.mostrarModal = false;
    this.palletForm.reset();
  }

  /**
   * controla el form para la crecion del nuevo pallet
   * @returns {void} oculta el modal para el submit
   */
  submitForm(): void {
    if (this.palletForm.invalid) {
      for (const i in this.palletForm.controls) {
        this.palletForm.controls[i].markAsDirty();
        this.palletForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    this.newPallet(this.palletForm);
    this.mostrarModal = false;
    this.palletForm.reset();
  }

  /**
   * controla la finalizacion del palletizado e reinicia la pestaña
   */
  async finPalletizado(): Promise<any> {
    const confirmacion = await SolicitarConfirmacion(
      "Esta seguro de finalizar el Paletizado?"
    );
    if (confirmacion) {
      Swal.fire({
        title: "Finalizando Palletizado...",
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.palletizadoService
        .finalizarPalletiazado(this.id_palletizado)
        .subscribe(
          (resp: any) => {
            localStorage.removeItem("id_palletizado");
            const id_palletizadoLocal =
              localStorage.getItem("id_palletizado") || "";
            if (id_palletizadoLocal === "") {
              Swal.close();
              Swal.fire(
                "Listo",
                "Los Datos del Palletizado se Guardaron Exitosamente",
                "success"
              );
              window.location.reload();
            }
          },
          (error) => {
            Swal.close();
            Swal.fire(
              "Error al guardar los datos",
              "Sucedio un error inesperado, vuelva a intentarlo",
              "error"
            );
          }
        );
    }
  }
}
