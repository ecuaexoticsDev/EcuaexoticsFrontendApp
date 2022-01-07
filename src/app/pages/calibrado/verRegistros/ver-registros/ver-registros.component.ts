import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { bodegaExterna } from 'src/app/interfaces/bodegaExterna';
import { CalibradoService } from '../../../../services/calibrado/calibrado.service';

@Component({
  selector: 'app-ver-registros',
  templateUrl: './ver-registros.component.html',
  styleUrls: ['./ver-registros.component.scss'],
})
export class VerRegistrosComponent implements OnInit {
  public listOfData: bodegaExterna[] = [];

  constructor(
    private calibradoService: CalibradoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarRegistros();
  }
/**
 * carga la lista de calibres de registros desde la base
 */
  cargarRegistros() {
    this.calibradoService.cargarCalibrado().subscribe((resp: any) => {
      this.listOfData = resp;
    });
  }
/**
 * maneja a redireccion hacia editar o crear un nuevo calibre
 * @param data el id de la bodega para el calibrado
 * @param action crear o editar
 */
  goCalibre(data: number, action: string) {
    if (action == 'crear') {
      this.router.navigate(['calibrado/crear-calibrado/'], {
        queryParams: { id_bodega: data },
      });
    } else if (action == 'editar') {
      this.router.navigate(['calibrado/crear-calibrado/'], {
        queryParams: { id_bodega: data, is_calibre: true },
      });
    }
  }

  /**
   * redireccion hacia la pestaña de creacion de control de calidad
   * @param data  id del calibrado
   */
  goControl(data: number) {
    this.router.navigate(['calibrado/control-calidad/'], {
      queryParams: { id_bodega: data },
    });
  }
}
