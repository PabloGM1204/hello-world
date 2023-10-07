import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  // Variable para el color
  private _color: string = "transparent";

  // Para poner el color que queramos
  @Input() set appHighlight(c: string){
    this._color = c;
  }

  // Al crear un elemento privado dentro del constructor se crea tambien como propiedad de la clase de ese elemento
  constructor(private el: ElementRef) {
    this.unsetHighLight();
  }

  // Cuando el rato esta por encima le damos los efectos
  @HostListener('mouseenter') onMouseEnter(){
    this.setHighLight();
  }

  // Cuando salimos ocn el raton le quitamos los efectos
  @HostListener('mouseleave') onMouseLeave(){
    this.unsetHighLight();
  }

  // Para ponerle efectos
  private setHighLight(){
    this.el.nativeElement.classList.add('highlight');
  }

  // Para quitarle los efectos
  private unsetHighLight(){
    this.el.nativeElement.classList.remove('highlight');
  }
}
