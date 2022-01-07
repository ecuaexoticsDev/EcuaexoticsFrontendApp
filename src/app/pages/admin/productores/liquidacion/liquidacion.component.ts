import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Productor } from 'src/app/models/productor';
import { ProductoresService } from 'src/app/services/productores/productores.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CalibradoService } from 'src/app/services/calibrado/calibrado.service';
import { Location } from '@angular/common';
import { SolicitarConfirmacion } from 'src/app/components/informationAlert';

@Component({
  selector: 'app-liquidacion',
  templateUrl: './liquidacion.component.html',
  styleUrls: ['./liquidacion.component.scss'],
})
export class LiquidacionComponent implements OnInit {
  public id_productor: number = 0;
  public idLiq: number = 0;
  public productor!: Productor;
  public cargando: boolean = true;
  public isVisible: boolean = false;
  public liquidacion: any;
  public cajasGrandes: any[] = [];
  public cajasPequenas: any[] = [];
  public editCache: { [key: number]: { edit: boolean; data: any } } = {};
  public editCajasPeq: { [key: number]: { edit: boolean; data: any } } = {};

  public liquiForm: FormGroup = this.fb.group({
    liquidacion: [null, Validators.required],
    fecha: [null, [Validators.required]],
    iva: [0],
    direccion: [null, [Validators.required]],
    destino: [
      null,
      [Validators.required, Validators.pattern('^[A-Za-zñÑáéíóúÁÉÍÓÚ ]+$')],
    ],
  });

  constructor(
    private rutaActiva: ActivatedRoute,
    private productoresService: ProductoresService,
    private fb: FormBuilder,
    private calibradoService: CalibradoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(({ id, idLiq }) => {
      this.getProductor(id);
      this.idLiq = idLiq;
    });
  }

  /**
   * obtiene los datos del productor
   * @param id_productor id del productor en la base
   */
  getProductor(id_productor: number) {
    this.cargando = true;
    this.productoresService
      .getProductorByid(id_productor)
      .pipe(delay(50))
      .subscribe((productor: any) => {
        this.productor = productor;
        this.cargarLiquidaciones(this.productor.id_productor);
      });
  }

  /**
   * carga las liquidaciones del productor
   * @param id_productor id del productor en la base 
   */
  cargarLiquidaciones(id_productor: number) {
    this.productoresService
      .obtenerLiquidaciones(id_productor)
      .pipe(delay(200))
      .subscribe((resp: any) => {
        resp.forEach((element: any) => {
          const id_calibrado: number = Number.parseInt(
            element.calibrado.id_calibrado
          );
          if (id_calibrado == this.idLiq) {
            this.liquidacion = element.calibrado;
            if (this.liquidacion.fecha_pago !==null) {
              const fechaExistente = new Date(this.liquidacion.fecha_pago);
              this.liquiForm.get('fecha')?.setValue(fechaExistente);
            }
            element.tipos.forEach((tipoCaja: any) => {
              if (tipoCaja.tipo === 'Carton Box 4.5 kg net weight') {
                this.cajasGrandes = tipoCaja.items;
              } else if (tipoCaja.tipo === 'Carton Box 2.5 kg net weight') {
                this.cajasPequenas = tipoCaja.items;
              }
            });
            
            this.updateEditCache();
            this.cargando = false;
          }
        });
      });
  }

  /**
   * convierte la fecha al formato requerido por el sistema
   * @param date fecha seleccionada
   * @returns fecha convertida al formato requerido
   */
  convertDate(date: Date): string {
    return (
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    );
  }

  /**
   * controla el form de los datos de liquidacion
   * @returns 
   */
  submitForm(): void {
    if (this.liquiForm.invalid) {
      for (const i in this.liquiForm.controls) {
        this.liquiForm.controls[i].markAsDirty();
        this.liquiForm.controls[i].updateValueAndValidity();
      }
      return;
    }
    this.liquidacion.destino = this.liquiForm.get('destino')?.value;
    this.liquidacion.fecha_pago = this.convertDate(
      this.liquiForm.get('fecha')?.value
    );
    this.liquidacion.num_liquidacion = String(
      this.liquiForm.get('liquidacion')?.value
    );
    this.liquidacion.iva = this.liquiForm.get('iva')?.value;
    this.liquidacion.direccion = this.liquiForm.get('direccion')?.value;

    this.calibradoService
      .actulizarLiquidacion(this.idLiq, this.liquidacion)
      .subscribe(
        (resp: any) => {
          Swal.fire('Listo', 'Datos Asignados', 'success');
        },
        (error) => {
          Swal.fire('Error', 'Sucedio un Error Inesperado', 'error');
        }
      );
  }
 /**
  * inicia la edidicion de los items de liquidacin
  * @param id id del item de liquidadcion
  * @param tipo_caja tipo de caja del item
  * @returns 
  */
  startEdit(id: number, tipo_caja: string): void {
    if (tipo_caja === 'Carton Box 2.5 kg net weight') {
      this.editCajasPeq[id].edit = true;
    } else if (tipo_caja === 'Carton Box 4.5 kg net weight') {
      this.editCache[id].edit = true;
    } else {
      return;
    }
  }

  /**
   * guarda los datos de la liquidacion
   * @param data datos del item de liquidacion
   * @returns 
   */
  saveEdit(data: any): void {
    let itemUpdate: any;
    let index: any;
    if (data.tipo_caja === 'Carton Box 2.5 kg net weight') {
      itemUpdate = this.editCajasPeq[data.id_item_liquidacion].data;
      index = this.cajasPequenas.findIndex(
        (item) => item.id_item_liquidacion === data.id_item_liquidacion
      );
     
    } else if (data.tipo_caja === 'Carton Box 4.5 kg net weight') {
      itemUpdate = this.editCache[data.id_item_liquidacion].data;
      index = this.cajasGrandes.findIndex(
        (item) => item.id_item_liquidacion === data.id_item_liquidacion
      );
      
    } else {
      return;
    }

    if (itemUpdate.precio < 0) {
      Swal.fire('Error', 'No ingresar Precios Negativos','error')
      return;
    }
    this.calibradoService
      .actualizarItem(itemUpdate.id_item_liquidacion, itemUpdate.precio)
      .subscribe(
        (resp: any) => {
          if (itemUpdate.tipo_caja === 'Carton Box 2.5 kg net weight') {
            Object.assign(
              this.cajasPequenas[index],
              this.editCajasPeq[data.id_item_liquidacion].data
            );
            this.editCajasPeq[data.id_item_liquidacion].edit = false;
            Swal.fire(
              'Actualización Exitosa',
              'Datos de liquidacion Actualizados',
              'success'
            );
          } else {
            Object.assign(
              this.cajasGrandes[index],
              this.editCache[data.id_item_liquidacion].data
            );
            this.editCache[data.id_item_liquidacion].edit = false;
            Swal.fire(
              'Actualización Exitosa',
              'Datos de liquidacion Actualizados',
              'success'
            );
          }
        },
        (err) => {
          if (itemUpdate.tipo_caja === 'Carton Box 2.5 kg net weight') {
            Swal.fire(
              'Error',
              'Sucedio un error, no se pudo actualizar los datos de la liquidacion',
              'error'
            );
            this.editCajasPeq[data.id_item_liquidacion].edit = false;
          } else {
            Swal.fire(
              'Error',
              'Sucedio un error, no se pudo actualizar los datos de la liquidacion',
              'error'
            );
            this.editCache[data.id_item_liquidacion].edit = false;
          }
        }
      );
  }

  /**
   * actualiza los id's de la tabla de cajas 
   */
  updateEditCache(): void {
    this.cajasGrandes.forEach((item) => {
      this.editCache[item.id_item_liquidacion] = {
        edit: false,
        data: { ...item },
      };
    });
    this.cajasPequenas.forEach((item) => {
      this.editCajasPeq[item.id_item_liquidacion] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  /**
   * cancela la  edicion de los items de la liquidacion
   * @param id id del item de liquidacion
   * @param tipo_caja tipo de caja en el cual se edita el item
   * @returns 
   */
  cancelEdit(id: number, tipo_caja: string): void {
    if (tipo_caja === 'Carton Box 2.5 kg net weight') {
      const index = this.cajasPequenas.findIndex(
        (item) => item.id_item_liquidacion === id
      );
      this.editCajasPeq[id] = {
        data: { ...this.cajasPequenas[index] },
        edit: false,
      };
    } else if (tipo_caja === 'Carton Box 4.5 kg net weight') {
      const index = this.cajasGrandes.findIndex(
        (item) => item.id_item_liquidacion === id
      );
      this.editCache[id] = {
        data: { ...this.cajasGrandes[index] },
        edit: false,
      };
    } else {
      return;
    }
  }

  /**
   * finaliza la liqudicacion y asigna los datos al productor en la base
   */
  async finalizarLiq(): Promise<any> {
    this.cajasGrandes.forEach((element) => {
      if (element.precio === 0) {
        Swal.fire('Error', 'Ingrese el precio en todos lo elementos', 'error');
       
        return;
      }
    });
    this.cajasPequenas.forEach((element) => {
      if (element.precio === 0) {
        Swal.fire('Error', 'Ingrese el precio en todos lo elementos', 'error');
        
        return;
      }
    });
    const confirmacion = await SolicitarConfirmacion(
      '¿Desea finalizar la Liquidación?'
    );
    if (confirmacion) {
      Swal.fire({
        title: 'Guardando Liquidación...',
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.calibradoService.actualizarEstado(this.idLiq, true).subscribe(
        (resp: any) => {
          Swal.close();
          Swal.fire(
            'Listo',
            'Los Datos de la Liquidación se Guardaron Exitosamente',
            'success'
          );
          this.location.back();
        },
        (error) => {
          Swal.close();
          Swal.fire(
            'Error al guardar los datos',
            'Sucedio un error inesperado, vuelva a intentarlo',
            'error'
          );
        }
      );
    }
  }
}
