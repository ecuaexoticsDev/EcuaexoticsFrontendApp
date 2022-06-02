import { Component, OnInit } from '@angular/core';
import { ProductoresService } from '../../../../services/productores/productores.service';
import { productores } from '../../../../reports/estructuraRecepcion';
import { Productor } from '../../../../models/productor';

@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.scss']
})
export class ConsolidadoComponent implements OnInit {

  public cargando = true;
  public  isVisible = false;
  public productores: Productor[] = [];
  public selectedValue = null;

  public dateFormat = 'MM/dd/yyyy';
  public rangofechas:Date[]  = [] ;
 
  constructor(private productoresService: ProductoresService) { }

  ngOnInit(): void {
    this.cargarProductores()
  }


  cargarProductores(){
    this.productoresService.cargarProductores().subscribe(
      (resp: any)=> {
        this.productores = resp
        this.cargando =false;
      }
    )
  }

  /**
   * filtra por fechas el consolidado
   * 
   */
   onChange(result: Date[]){
    console.log(result);
     
    }
}
