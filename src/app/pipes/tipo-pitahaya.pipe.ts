import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "tipoPitahaya",
})
export class TipoPitahayaPipe implements PipeTransform {
  /**
   * Transforma el tipo de pitahaya en una cadena de texto específica.
   * @param {string} tipoPitahaya - El tipo de pitahaya a transformar.
   * @returns {string} - El tipo de pitahaya transformado.
   */
  transform(tipoPitahaya: string): string {
    if (tipoPitahaya === "Yellow Dragon Fruit") {
      return "Yellow";
    } else if (tipoPitahaya === "Red Dragon Fruit") {
      return "Red";
    } else {
      return "Rose";
    }
  }
}
