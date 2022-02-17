import { Component, OnInit } from '@angular/core';
import { palletizado } from 'src/app/interfaces/palletizado.interface';
import { PalletizadoService } from '../../services/palletizado/palletizado.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  public palletizado!: any;
  public cargando: boolean = true;

  constructor(private palletizadoService:PalletizadoService) {
    
  }

  ngOnInit(): void {
    this.cargarPalletizado();
  }

  cargarPalletizado(){
    this.palletizadoService.getPalletizado().subscribe(
      (resp:any)=>{
        this.palletizado = resp;
        this.cargando = false;
      }
    )
  }

  //TODO: Aqui generar doc pdf de la tabla 
  generarDoc(){
    console.log('GenerarDoc');
  }

 
}
