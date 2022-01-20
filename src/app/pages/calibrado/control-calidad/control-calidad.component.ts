import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { faMinusCircle, faUpload } from '@fortawesome/free-solid-svg-icons';
import { SolicitarConfirmacion } from 'src/app/components/informationAlert';
import { ControlCalidadService } from 'src/app/services/controlCalidad/control-calidad.service';

import Swal from 'sweetalert2';

interface FileObject {
  idFile: any;
  name: string;
  file: File;
  state: boolean;
}

@Component({
  selector: 'app-control-calidad',
  templateUrl: './control-calidad.component.html',
  styleUrls: ['./control-calidad.component.scss'],
})
export class ControlCalidadComponent implements OnInit {
  listFileImage: FileObject[] = [];
 // urlBackend: string = 'https://ecuaexotics.pythonanywhere.com';
  faMinusCircle = faMinusCircle;
  faUpload = faUpload;

  id_bodega: number = 0;

  txtInputObservacion: FormControl = this.getFormControl();

  constructor(
    private servicioControlCalidad: ControlCalidadService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.hasOwnProperty('id_bodega')) {
        this.id_bodega = params['id_bodega'];
      }
    });
  }

  /**
   * controla la seleccion de archivos al control 
   * de calidad
   */
  onChangefileSeleted(event: any) {
    if (event.target.files.length > 0) {
      const nameF = event.target.files[0].name;
      const extensionArray = nameF.split('.');
      const extension = extensionArray[extensionArray.length - 1];

      this.listFileImage.push({
        idFile: null,
        name: event.target.files[0].name,
        file: <File>event.target.files[0],
        state: true,
      });
    }
  }

  getFormControl() {
    return new FormControl('', Validators.required);
  }

  removeFileFromList(idx: number) {
    this.listFileImage[idx].state = false;
  }

  /**
   * guarda la info del control de calidad en la base
   */
  async saveControl() {
    const confirmacion = await SolicitarConfirmacion(
      '¿Desea continuar con el registro de control de calidad?'
    );
    if (confirmacion) {
      Swal.fire({
        title: 'Guardando...',
        didOpen: () => {
          Swal.showLoading();
        },
      });

      let dataControl = new FormData();
      dataControl.append('observacion', this.txtInputObservacion.value);
      dataControl.append('id_bodega', String(this.id_bodega));
      let cant = 0;
      for (const item of this.listFileImage) {
        if (item.state) {
          cant++;
          let nameImage = 'imagen_' + String(cant);
          dataControl.append(nameImage, item.file);
        }
      }
      dataControl.append('cantidad', String(cant));
      this.servicioControlCalidad.guardarControl(dataControl).subscribe(
        (resp: any) => {
          Swal.fire(resp.message, '', 'success');
          this.location.back();
        },
        (error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Error...',
            text: JSON.stringify(error),
          });
        }
      );
    }
  }
}
