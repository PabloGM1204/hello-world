import { Component } from '@angular/core';
import { BehaviorSubject, Observable, observeOn } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserInfoFavClicked } from './user-info/user-info-fav-clicked';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private router: Router,
    private toast: ToastController,
    public users: UserService // Sera la lista que usaremos desde el HTML
  ) {}

  public loading: boolean = true;

  // Método de ciclo de vida que es al crear el componente
  ngOnInit(): void{
    // Para que salga que esta cargado los usuarios
    this.loading = true;
    // Recogemos todos lo usuarios
    this.users.getAll().subscribe(users =>{
      this.loading = false;
    });
  }

  // Recogemos el usuario seleccionado y el el fav para añadirlo o eliminarlo
  public onFavClicked(usuario: User, event: UserInfoFavClicked){
    // Guardamos el usuario al que le hemos hecho click
    var _user:User = {...usuario}
    // El favorito del usuario le preguntamos como esta y le asignamos el valor contrario
    _user.fav = event.fav??false;

    // Seguimos con el update

    // Notificamos con un Toast que se ha pulsado
    const options: ToastOptions = {
      // Mensaje
      message: `User ${event.fav?'added': 'removed'} ${event.fav?'to': 'form'} favourites`,
      // Dura un segundo
      duration: 1000,
      position: 'bottom',
      color: 'danger',
      cssClass: 'fav-ion-toast'
    };

    // Creamos el toast y lo presentamos
    this.toast.create(options).then(toast=>toast.present());
  }

  welcome(){
    this.router.navigate(["./welcome"])
  }

}
