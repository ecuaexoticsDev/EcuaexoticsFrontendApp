import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios';
import { LocalStorageService } from '../LocalStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  public usuario?: Usuario;
  public menu: any[] = [];
  public submenu: any[] = [];
  constructor(private localStorage: LocalStorageService) {
    this.cargarMenu();
  }

  cargarMenu() {
    if (this.usuario?.rol === 'Operador_bodega') {
      const menuBodega = [
        {
          title: 'Bodega Externa',
          icon: 'mdi mdi-gauge',
          path: 'bodega/ver-bitacoras',
        },
        {
          title: 'Recepcion Transporte',
          icon: 'mdi mdi-gauge',
          path: 'bodega/ver-transporte',
        },
      ];
      this.menu = menuBodega;
    } else if (this.usuario?.rol === 'Operador_calibrado') {
      const menuCalibrado = [
        {
          title: 'Área de Calibre',
          icon: 'mdi mdi-folder-lock-open',
          
        },
      ];
      this.menu = menuCalibrado;
    } else if (this.usuario?.rol === 'Operador_palletizado') {
      const menuPallet = [
        {
          title: 'Control de Palletizado',
          icon: 'mdi mdi-folder-lock-open',
          path: 'palletizado/control-palletizado',
        },
      ];
      this.menu = menuPallet;
    } else if (this.usuario?.rol === 'Admin') {
      const menuAdmin = [
        {
          title: 'Personal',
          icon: 'mdi mdi-folder-lock-open',
          path: 'dashboard/usuarios',
          
        },
        {
          title: 'Clientes',
          icon: 'mdi mdi-folder-lock-open',
          path: 'dashboard/clientes',
         
        },
        {
          title: 'Productores',
          icon: 'mdi mdi-folder-lock-open',
          path: 'dashboard/productores',
          
        },
        {
          title: 'Transporte',
          icon: 'mdi mdi-folder-lock-open',
          path: 'dashboard/transporte',
          
        },
      ];
      const submenuAdmin = [
        {
          title: 'Consolidado',
          icon: 'mdi mdi-folder-lock-open',
          path: 'dashboard/consolidado',
          
        },
      ];
      this.menu = menuAdmin;
      this.submenu = submenuAdmin;
    }
  }
}
