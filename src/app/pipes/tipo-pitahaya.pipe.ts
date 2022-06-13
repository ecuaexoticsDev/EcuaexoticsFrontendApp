import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoPitahaya'
})
export class TipoPitahayaPipe implements PipeTransform {

  transform(tipoPitahaya: string): string {
    if (tipoPitahaya === "Yellow Dragon Fruit") {
      return 'Yellow'
    }else if(tipoPitahaya === "Red Dragon Fruit"){
          return "Red"
    }else{
        return "Rose"
    }
    
  }

}
