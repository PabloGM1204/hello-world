import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserInfoFavClicked } from '../../../core/interfaces/user-info-fav-clicked';
import { User } from '../../../core/interfaces/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {

  //Atributos del modulo el cual servira para pasarlo al html pero recogerlos del home.page
  @Input() usuario:User | null=null;

  @Output() onFavClicked: EventEmitter<UserInfoFavClicked> = new EventEmitter<UserInfoFavClicked>();
  @Output() deleteClicked: EventEmitter<void> = new EventEmitter<void>();
  @Output() cardClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private router:Router 
  ) { }

  ngOnInit() {}

  // Al hacer click en la tarjeta para poder ir a welcome
  cardClick(){
    this.cardClicked.emit();
    this.router.navigate(['/welcome']);
  }

  // Recogemos un evento para cuando hagamos click podamos hacer lo que queramos
  onFavClick(event: any){
    this.onFavClicked.emit({
      fav: !(this.usuario?.fav??false)
    });
    // Nos ayuda este evento para que el click no vaya a la tarjeta de abajo y se quede en el boton
    event.stopPropagation();
  }

  // Recoge un evento para que cuando hagamos click podamos controlarlo y no haga clicks en mas cosas que esten por debajo
  deleteClick(event: any){
    this.deleteClicked.emit();
    event.stopPropagation();
  }

}
