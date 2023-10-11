import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primetaLetraMayusc'
})
export class PrimetaLetraMayuscPipe implements PipeTransform {

  // Metodo que recibe el el apellido por el html de user-info y cambia la primera letra para ponerla en mayuscula
  transform(text: string | undefined): string {
    if(text?.charAt(0) != null){
      return text.charAt(0).toUpperCase()
    }else return ""
  }

}
