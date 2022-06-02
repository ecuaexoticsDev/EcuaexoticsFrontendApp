import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuarios';
import { LocalStorageService } from 'src/app/services/LocalStorage/local-storage.service';
import { MenuService } from '../../services/menu/menu.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public menuItems!: any[];
  public usuario: Usuario;
  public submenuItems!: any[];

  constructor(
    public menuService: MenuService,
    private localStorage: LocalStorageService
  ) {
    this.usuario = this.localStorage.getUserLocalStorage();
   
  }

  ngOnInit(): void {
    this.menuItems = this.menuService.menu
    this.submenuItems = this.menuService.submenu
  }

  
  logout() {
    this.localStorage.removeLocalStorageTokens();
    this.localStorage.removeLocalStorageUser();
    
    this.menuService.menu = [];
    
    
  }
}
