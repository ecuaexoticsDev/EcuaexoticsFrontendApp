import { Component, OnInit } from '@angular/core';
import { ProductoresService } from '../../../../services/productores/productores.service';
import { Productor } from '../../../../models/productor';
import { ConsolidadoService } from '../../../../services/analitica/consolidado.service';
import { consolidado } from 'src/app/interfaces/Consolidado';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.scss']
})
export class ConsolidadoComponent implements OnInit {

  public cargando = true;
  public  isVisible = false;
  public productores: Productor[] = [];
  public productorSelected = null;
  public lote : number | null = null
  public tiposPitajaya: string[] = ['Yellow Dragon Fruit', 'Red Dragon Fruit','Rose Dragon Fruit'];
  public tipoFrutaSelec = null;

  public dateFormat = 'dd/MM/yyyy';
  public rangofechas:Date[]  = [] ;
  public fechasActuales:Date[]  = [] ;
  public flagFiltro = true;
  public totalResultados :number = 0;
  public Procesos : consolidado[] = []
  public desde: number  = 0 ;

  constructor(private productoresService: ProductoresService, 
              private consolidadoService: ConsolidadoService) { }

  ngOnInit(): void {
    this.cargarProductores()
    let actualDate = new Date()
    this.fechasActuales.push(actualDate)
    this.fechasActuales.push(actualDate)
    this.cargarConsolidado(this.fechasActuales)
  }


  cargarProductores(){
    this.productoresService.cargarProductores().subscribe(
      (resp: any)=> {
        this.productores = resp
        this.cargando =false;
      },(err)=>{
        Swal.fire('Error', 'Sucedio un error, no se pudo cargar los Productores', 'error');
        
      },
    )
  }

  cargarConsolidado(fechas:Date[] ,lote?:number , id_prod?:number, fruta?: string){
    this.consolidadoService.cargarConsolidado(fechas,lote!,id_prod!,fruta!).subscribe(
      (resp:consolidado[])=>{
       
        this.Procesos = resp
        this.totalResultados = this.Procesos.length
      },(err)=>{
        Swal.fire('Error', 'Sucedio un error, no se pudo cargar los Registros', 'error');
        
      },
    )
    
  }

  /**
   * Aplicar los filtros y llamar al backend por los datos
   * 
   */
    aplicarFiltros(){
      
      if (this.productorSelected!== null || this.lote !== null || this.rangofechas.length>0 || this.tipoFrutaSelec!== null){
        this.Procesos = []
        this.cargarConsolidado(this.rangofechas,this.lote!,this.productorSelected!,this.tipoFrutaSelec!)
          this.flagFiltro =  false
      }
    }


  /**
   * eliminar los filtros y llamar al backend por los datos default
   * 
   */
    eliminarFiltros(){

      if (this.productorSelected!=null || this.lote != null || this.rangofechas.length>0 || this.tipoFrutaSelec != null) {
            this.productorSelected = null
            this.lote = null
            this.rangofechas = []
            this.tipoFrutaSelec = null
      }
      this.flagFiltro = true
      this.cargarConsolidado(this.fechasActuales)

    }

    exportarExcel():void{
      this.consolidadoService.exportToExcel(this.Procesos,'ReporteConsolidados')
    }
}
