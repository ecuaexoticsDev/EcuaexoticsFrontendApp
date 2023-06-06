import { stringify } from "@angular/compiler/src/util";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Usuario } from "src/app/models/usuarios";
import Swal from "sweetalert2";
import { UsuariosService } from "../../../services/usuarios.service";

@Component({
  selector: "app-usuarios",
  templateUrl: "./usuarios.component.html",
  styleUrls: ["./usuarios.component.scss"],
})
export class UsuariosComponent implements OnInit {
  public cargando = true;
  public isVisible = false;
  public verBuscar = false;
  public searchValue = "";
  public filteruser = [
    { text: "Sí", value: true },
    { text: "No", value: false },
  ];
  public listOfData: Usuario[] = [];
  public passwordVisible = false;
  public editCache: { [key: number]: { edit: boolean; data: Usuario } } = {};
  public userFilterFn = (list: string[], item: Usuario) =>
    list.some(
      (is_active) => item.is_active.toString().indexOf(is_active) !== -1
    );
  public roles: string[] = [
    "Operador_calibrado",
    "Admin",
    "Operador_bodega",
    "Operador_palletizado",
  ];
  public userForm: FormGroup = this.fb.group({
    nombre: [null, Validators.required],
    apellido: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]],
    username: [null, Validators.required],
    rol: [null, Validators.required],
  });
  constructor(
    private usuariosService: UsuariosService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  /**
   * carga los datos en la tabla de usuarios
   */
  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      (resp: any) => {
        this.listOfData = resp;
        this.updateEditCache();
        this.cargando = false;
      },
      (err) => {
        Swal.fire(
          "Error",
          "Sucedio un error, no se pudo cargar los Usuarios",
          "error"
        );
      }
    );
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }

  /**
   * guarda los datos actualizados de la tabla de usuarios
   * @param data datos del usuario para actualizar
   * @returns {void} muestra un modal fue posible el actualizar el elemento
   */
  saveEdit(data: Usuario): void {
    const expreg = new RegExp(
      "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
      "i"
    );
    const usuarioUpdate: Usuario = this.editCache[data.id].data;
    const index = this.listOfData.findIndex((item) => item.id === data.id);
    if (
      expreg.test(usuarioUpdate.email) === true &&
      usuarioUpdate.username !== ""
    ) {
      this.usuariosService.actualizarUsuario(usuarioUpdate).subscribe(
        (resp: any) => {
          Object.assign(this.listOfData[index], this.editCache[data.id].data);
          this.editCache[data.id].edit = false;
          Swal.fire("Actualización Exitosa", "Usuario Actualizado", "success");
        },
        (err) => {
          Swal.fire(
            "Error",
            "Sucedio un error, no se pudo actualizar el Usuario",
            "error"
          );
          this.editCache[data.id].edit = false;
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
   * actualiza los id's de los datos en la tabla de usuarios
   */
  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  /**
   * crea un nuevo usuario en la base
   * @param data datos del usuario extraidos del formulario
   * @return {void} crea el usuario en la base de datos
   */
  crearUsuario(data: Usuario) {
    this.usuariosService.crearUsuario(data).subscribe(
      (resp: any) => {
        this.cargarUsuarios();
        Swal.fire("Exito", "Usuario creado exitosamente", "success");
      },
      (error) => {
        Swal.fire("Error", "Sucedio un error inesperado", "error");
      }
    );
  }

  /**
   * resetea la busqueda en la tabla de usuarios
   */
  reset(): void {
    this.searchValue = "";
    this.cargarUsuarios();
    this.verBuscar = false;
  }

  /**
   * controla la busqueda por nombre en la tabla de usuario
   */
  search(): void {
    this.verBuscar = false;
    this.listOfData = this.listOfData.filter(
      (item: Usuario) =>
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
    this.userForm.reset();
  }

  /**
   * controla el form para crear un usuario
   * @returns booleano controla la visiblidad del modal
   */
  submitForm(): void {
    if (this.userForm.invalid) {
      for (const i in this.userForm.controls) {
        this.userForm.controls[i].markAsDirty();
        this.userForm.controls[i].updateValueAndValidity();
      }
      return;
    }

    this.crearUsuario(this.userForm.value);
    this.isVisible = false;
    this.userForm.reset();
  }
}
