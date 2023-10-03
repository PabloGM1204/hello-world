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

  // Método para ir a la página de Welcome
  welcome(){
    this.router.navigate(["./welcome"])
  }

  // Recogemos el usuario seleccionado y el el fav para añadirlo o eliminarlo
  public onFavClicked(usuario: User, event: UserInfoFavClicked){
    // Guardamos el usuario al que le hemos hecho click
    var _user:User = {...usuario}
    // El favorito del usuario le preguntamos como esta y le asignamos el valor contrario
    _user.fav = event.fav??false;
    // Me subscribo al metodo para cuando realice los cambios en el servicio del usuario los reciba
    this.users.updateUser(_user).subscribe({
      next: user => {
        // Notificamos con un Toast que se ha pulsado
        const options: ToastOptions = {
          // Mensaje
          message: `User ${event.fav?'added': 'removed'} ${event.fav?'to': 'form'} favourites`,
          // Dura un segundo
          duration: 1000,
          // Posición
          position: 'bottom',
          // Color
          color: 'danger',
          // Clase css
          cssClass: 'fav-ion-toast'
        };
        this.toast.create(options).then(toast=>toast.present());
      },
      error: err=>{
        console.log(err);
      }
    });
    
    

    // Creamos el toast y lo presentamos
  }

  // Método para eliminar el usuario
  public deleteClicked(usuario: User){
    // Copio el usuario que hemos seleccionado
    var _user:User = {...usuario};
    // Para eliminar el usuario me tengo que suscribir ya que lo hacemos con un observable y al subscribirnos le pasamos todos los datos de la lista 
    this.users.deleteUser(_user).subscribe({
      next:User => {
        // Notificamos con un Toast que se ha pulsado
        const options: ToastOptions = {
          // Mensaje
          message: `User removed`,
          // Dura un segundo
          duration: 1000,
          // Posición
          position: 'bottom',
          // Color
          color: 'danger',
          // Clase css
          cssClass: 'fav-ion-toast'
        };
        // Creamos el toast que hemos coonfigurado anteriormente
        this.toast.create(options).then(toast=>toast.present);
      },
      error: err=>{
        console.log(err);
      }
    });
  }
}
