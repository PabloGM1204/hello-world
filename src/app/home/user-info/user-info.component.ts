import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserInfoFavClicked } from './user-info-fav-clicked';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {

  //Atributos del modulo el cual servira para pasarlo al html pero recogerlos del home.page
  @Input() usuario?:{
    id?: number,
    nombre?: string,
    apellidos?: string,
    edad?: number,
    fav: boolean
  }

  @Output() onFavClicked: EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();

  onFavClick(event: any){
    this.onFavClicked.emit({
      fav: !(this.usuario?.fav??false)
    });
    // Nos ayuda este evento para que el click no vaya a la tarjeta de abajo y se quede en el boton
    event.stopPropagation();
  }

  constructor() { }

  ngOnInit() {}

}
