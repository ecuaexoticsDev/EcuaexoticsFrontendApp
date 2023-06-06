import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { TransportesService } from "src/app/services/transporte/transportes.service";
import { Transporte } from "src/app/models/transporte";
import { Camion } from "src/app/models/camion";

@Component({
  selector: "app-transporte",
  templateUrl: "./transporte.component.html",
  styleUrls: ["./transporte.component.scss"],
})
export class TransporteComponent implements OnInit {
  public isVisible = false;
  public verBuscar = false;
  public cargando = true;
  public searchValue = "";
  public filterprod = [
    { text: "Sí", value: true },
    { text: "No", value: false },
  ];

  public transFilterFn = (list: string[], item: Transporte) =>
    list.some((is_active) => item.activo.toString().indexOf(is_active) !== -1);
  public listOfTransporte: Transporte[] = [];
  public camiones: Camion[] = [];
  public editCache: { [key: number]: { edit: boolean; data: Transporte } } = {};

  public transForm: FormGroup = this.fb.group({
    nombre: [null, Validators.required],
    apellido: [null, Validators.required],
    cedula: [
      null,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern(/^-?(0|[0-9]\d*)?$/),
      ],
    ],
    telefono: [
      null,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        Validators.pattern(/^-?(0|[0-9]\d*)?$/),
      ],
    ],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private transporteService: TransportesService
  ) {}

  ngOnInit(): void {
    this.cargarTransportes();
  }

  /**
   * obtiene  los transportes diponibles de la base de datos
   */
  cargarTransportes() {
    this.transporteService.getTransportes().subscribe(
      (resp: any) => {
        this.listOfTransporte = resp;
        this.updateEditCache();
        this.cargando = false;
      },
      (err) => {
        Swal.fire(
          "Error",
          "Sucedio un error, no se pudo cargar los Transportes",
          "error"
        );
      }
    );
  }

  /**
   * carga los camiones con el id del transporte
   * @param id_transporte
   * @return {void} devuelve los datos de los camiones segun el transporte
   */
  cargarCamiones(id_transporte: number) {
    this.camiones = [];
    this.transporteService.getCamiones_by_id(id_transporte).subscribe(
      (resp: any) => {
        this.camiones = resp;
      },
      (err) => {
        Swal.fire(
          "Error",
          "Sucedio un error, no se pudo cargar los Camiones",
          "error"
        );
      }
    );
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  /**
   * guarda los datos actualizados de la tabla de transportes
   * @param data datos del transporte para actualizar
   * @returns
   */
  saveEdit(data: Transporte): void {
    //const expreg =  new RegExp("/^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/");
    const transporteUpdate: Transporte =
      this.editCache[data.id_transporte].data;
    const index = this.listOfTransporte.findIndex(
      (item) => item.id_transporte === data.id_transporte
    );
    if (transporteUpdate.cedula.length > 0) {
      this.transporteService.actualizarTransporte(transporteUpdate).subscribe(
        (resp: any) => {
          Object.assign(
            this.listOfTransporte[index],
            this.editCache[data.id_transporte].data
          );
          this.editCache[data.id_transporte].edit = false;
          Swal.fire(
            "Actualización Exitosa",
            "Datos del Transportista Actualizados",
            "success"
          );
        },
        (err) => {
          Swal.fire(
            "Error",
            "Sucedio un error, no se pudo actualizar el Transportista",
            "error"
          );
          this.editCache[data.id_transporte].edit = false;
        }
      );
    } else {
      Swal.fire(
        "Error",
        "Verifique que los nuevos datos sean correctos",
        "error"
      );
      return;
    }
  }

  /**
   * actualiza los id's de los datos en la tabla de transporte
   */
  updateEditCache(): void {
    this.listOfTransporte.forEach((item) => {
      this.editCache[item.id_transporte] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  /**
   * redirecciona hacia la vista del perfil del productor
   * @param id_usuario id del productor para mostrar su perfil
   */
  verUsuario(id_usuario: number) {
    this.router.navigate(["/dashboard/transporte/ver-transporte/", id_usuario]);
  }

  /**
   * crea un nuevo transporte en la base
   * @param data datos del transporte extraidos del formulario
   */
  crearTransporte(data: Transporte) {
    this.transporteService.crearTransporte(data).subscribe(
      (resp: any) => {
        this.cargarTransportes();
        Swal.fire("Exito", "Transporte creado exitosamente", "success");
      },
      (error) => {
        Swal.fire(
          "Error",
          "Sucedio un error, no se pudo crear el Transporte, Revise los datos.",
          "error"
        );
        return;
      }
    );
  }

  cancelEdit(id: number): void {
    const index = this.listOfTransporte.findIndex(
      (item) => item.id_transporte === id
    );
    this.editCache[id] = {
      data: { ...this.listOfTransporte[index] },
      edit: false,
    };
  }

  /**
   * resetea la busqueda en la tabla de productores
   */
  reset(): void {
    this.searchValue = "";
    this.cargarTransportes();
    this.verBuscar = false;
  }

  /**
   * controla la busqueda por nombre en la tabla de productores
   */
  search(): void {
    this.verBuscar = false;
    this.listOfTransporte = this.listOfTransporte.filter(
      (item: Transporte) =>
        (item.nombre + item.apellido)
          .toLowerCase()
          .indexOf(this.searchValue.toLowerCase()) !== -1
    );
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.transForm.reset();
  }

  /**
   * controla el form para crear un productor
   * @returns booleano controla la visiblidad del modal
   */
  submitForm(): void {
    if (this.transForm.invalid) {
      for (const i in this.transForm.controls) {
        this.transForm.controls[i].markAsDirty();
        this.transForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    this.crearTransporte(this.transForm.value);
    this.isVisible = false;
    this.transForm.reset();
  }
}
