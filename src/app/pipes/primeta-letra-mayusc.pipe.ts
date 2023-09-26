import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'primetaLetraMayusc'
})
export class PrimetaLetraMayuscPipe implements PipeTransform {

  transform(text: string | undefined): string {
    if(text?.charAt(0) != null){
      return text.charAt(0).toUpperCase()
    }else return ""
  }

}
