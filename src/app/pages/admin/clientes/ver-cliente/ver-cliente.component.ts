import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router, Routes } from "@angular/router";
import { delay } from "rxjs/operators";
import { Cliente } from "src/app/models/cliente";
import { ClientesService } from "../../../../services/clientes/clientes.service";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import Swal from "sweetalert2";
import { Route } from "@angular/compiler/src/core";

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as reportStrcuturePacking from "src/app/reports/estructuraPackingList";
import * as reportStrcutureInvoice from "src/app/reports/estructuraInvoice";

@Component({
  selector: "app-ver-cliente",
  templateUrl: "./ver-cliente.component.html",
  styleUrls: ["./ver-cliente.component.scss"],
})
export class VerClienteComponent implements OnInit {
  public id_cliente: number = 0;
  public cliente!: Cliente;
  public cargando: boolean = true;
  public packingList: any[] = [];
  public invoice: any[] = [];
  public tipoIcon: string = "";
  public color: string = "";
  public packingListTotal: any = [];
  public invoiceTotal: any = [];

  //filtro de fechas
  public dateFormat = "MM/dd/yyyy";
  public fechasPacking: Date[] = [];
  public fechasInvoice: Date[] = [];

  public clientForm: FormGroup = this.fb.group({
    direccion: [null, [Validators.required, Validators.minLength(3)]],
    pais: [null, [Validators.required, Validators.minLength(3)]],
    destino_orden: [null, [Validators.required, Validators.minLength(3)]],
    notify_address: [null, [Validators.required, Validators.minLength(3)]],
    notify: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    private rutaActiva: ActivatedRoute,
    private clientesService: ClientesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(({ id }) => {
      this.id_cliente = id;
      this.getCliente(id);
    });
  }

  /**
   * obtiene los datos del cliente desde el servidor
   * @param {number} id_cliente
   */
  getCliente(id_cliente: number) {
    this.cargando = true;
    this.clientesService
      .getClienteByid(id_cliente)
      .pipe(delay(100))
      .subscribe((cliente: any) => {
        this.cliente = cliente;
        if (this.cliente.activo === true) {
          this.color = "#52c41a";
          this.tipoIcon = "check-circle";
        } else {
          this.color = "red";
          this.tipoIcon = "close-circle";
        }
        this.obtenerPackingList(id_cliente);
        this.obtenerInvoice(id_cliente);
      });
  }

  /**
   * actualiza los datos del cliente en la base
   * @param {FormGroup} data datos del formualario
   */
  actualizarDatos(data: FormGroup) {
    this.cliente.pais = data.controls["pais"].value;
    this.cliente.direccion = data.controls["direccion"].value;
    this.cliente.destino_orden = data.controls["destino_orden"].value;
    this.cliente.notify_address = data.controls["notify_address"].value;
    this.cliente.notify = data.controls["notify"].value;
    this.clientesService.updateCliente(this.cliente).subscribe(
      (resp: any) => {
        Swal.fire(
          "Actualización Exitosa",
          "Datos del Cliente Actualizados",
          "success"
        );
      },
      (error) => {
        Swal.fire(
          "Error",
          "Sucedio un error, no se pudo actualizar los datos del Cliente",
          "error"
        );
      }
    );
  }

  /**
   * controla el formulario para actualizar los datos del cliente
   * @returns {void}
   */

  submitForm(): void {
    if (this.clientForm.invalid) {
      for (const i in this.clientForm.controls) {
        this.clientForm.controls[i].markAsDirty();
        this.clientForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    this.actualizarDatos(this.clientForm);
    this.clientForm.reset();
  }

  /**
   * descarga el packing list
   * @param id_cliente
   */
  obtenerPackingList(id_cliente: number) {
    this.clientesService
      .getPackinglist(id_cliente)
      .pipe(delay(200))
      .subscribe(
        (resp: any) => {
          this.packingListTotal = resp;
          resp.forEach((element: any) => {
            this.packingList.push(element.packing);
          });
        },
        (err) => {
          Swal.fire(
            "Ocurrio un error inesperado",
            "Intentelo mas tarde",
            "warning"
          );
        }
      );
  }

  /**
   * filtra por fechas el packing del cliente
   *
   */
  onChange(result: Date[]) {
    let packingFiltrados: any[] = [];
    if (result.length !== 0) {
      this.packingList.forEach((element) => {
        if (element.fecha) {
          let fechaPack: Date = new Date(element.fecha);
          if (
            fechaPack.getTime() >= this.fechasPacking[0].getTime() &&
            fechaPack.getTime() <= this.fechasPacking[1].getTime()
          ) {
            packingFiltrados.push(element);
          }
        }
      });
      this.packingList = packingFiltrados;
    } else {
      this.packingList = [];
      this.packingListTotal.forEach((element: any) => {
        this.packingList.push(element.packing);
      });
    }
  }

  /**
   * descarga el invoice
   * @param id_cliente
   */
  obtenerInvoice(id_cliente: number) {
    this.clientesService
      .getInvoice(id_cliente)
      .pipe(delay(500))
      .subscribe(
        (resp: any) => {
          this.invoiceTotal = resp;
          resp.forEach((element: any) => {
            this.invoice.push(element.factura);
          });
          this.cargando = false;
        },
        (err) => {
          Swal.fire(
            "Ocurrio un error inesperado",
            "Intentelo mas tarde",
            "warning"
          );
        }
      );
  }

  /**
   * filtra por fechas el packing del cliente
   *
   */
  onChangeInvoice(result: Date[]) {
    let invoiceFiltrados: any[] = [];
    if (result.length !== 0) {
      this.invoice.forEach((element) => {
        if (element.fecha) {
          let fechaInv: Date = new Date(element.fecha);
          if (
            fechaInv.getTime() >= this.fechasInvoice[0].getTime() &&
            fechaInv.getTime() <= this.fechasInvoice[1].getTime()
          ) {
            invoiceFiltrados.push(element);
          }
        }
      });
      this.invoice = invoiceFiltrados;
    } else {
      this.invoice = [];
      this.invoiceTotal.forEach((element: any) => {
        this.invoice.push(element.factura);
      });
    }
  }

  /**
   * redirije al usuario a la vista del packing list
   * @param data id del cliente
   */
  irPackingList(data: any) {
    const id_packing = data.id_packing;
    this.router.navigate([`packing-list/${id_packing}/`], {
      relativeTo: this.rutaActiva,
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * genera el documento de packing list para el cliente
   * @param id_packing  id del packing list en la base
   */
  async generarDocPacking(id_packing: number) {
    this.packingListTotal.map(async (pkg: any) => {
      if (pkg.packing.id_packing === id_packing) {
        Swal.fire({
          title: "Generando reporte de PackingList...",
          didOpen: () => {
            Swal.showLoading();
          },
        });
        await this.delay(1500);
        let docDefinition: any = await {
          pageSize: "A4",
          pageOrientation: "portrait",
          content: [
            {
              stack: [
                reportStrcuturePacking.HeaderLiquidacion(),
                reportStrcuturePacking.DetailPacking(this.cliente, pkg),
                reportStrcuturePacking.TablaInformacion(pkg),
                reportStrcuturePacking.infoExtra(pkg),
              ],
              margin: [0, 0, 0, 0],
            },
          ],
        };
        Swal.close();
        pdfMake.createPdf(docDefinition).download("reportPacking.pdf");
      }
    });
  }

  /**
   * genera el documento de invoice
   * @param id_factura  id de la factura en la base
   */
  generarDocInvoice(id_factura: number) {
    this.invoiceTotal.map(async (invoice: any) => {
      if (invoice.factura.id_factura === id_factura) {
        Swal.fire({
          title: "Generando reporte Invoice...",
          didOpen: () => {
            Swal.showLoading();
          },
        });
        await this.delay(1500);
        let docDefinition: any = await {
          pageSize: "A4",
          pageOrientation: "portrait",
          content: [
            {
              stack: [
                reportStrcutureInvoice.HeaderInvoice(),
                reportStrcutureInvoice.DetailInvoice(this.cliente, invoice),
                reportStrcutureInvoice.TablaInformacion(invoice),
                reportStrcutureInvoice.infoBank(),
              ],
              margin: [0, 0, 0, 0],
            },
          ],
        };
        Swal.close();
        pdfMake.createPdf(docDefinition).download("reportInvoice.pdf");
      }
    });
  }
  /**
   * redirije al usuario a la pagina del invoice
   * @param data id del usuario
   */
  irInvoce(data: any) {
    const id_factura = data.id_factura;
    this.router.navigate([`invoice/${id_factura}/`], {
      relativeTo: this.rutaActiva,
    });
  }
}
