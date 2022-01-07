import { Component, OnInit } from '@angular/core';
import { MenuService } from '../services/menu/menu.service';
import { LocalStorageService } from '../services/LocalStorage/local-storage.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private menuService: MenuService , private localStorageService: LocalStorageService) { 
    this.menuService.usuario =  this.localStorageService.getUserLocalStorage();
  }

  ngOnInit(): void {
    this.menuService.cargarMenu();
  }

}
