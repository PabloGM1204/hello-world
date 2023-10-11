import { Component } from '@angular/core';
import { BehaviorSubject, Observable, observeOn, zip } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserInfoFavClicked } from '../core/interfaces/user-info-fav-clicked';
import { UserService } from '../core/services/user.service';
import { FavoritesService } from '../core/services/favorites.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public loading: boolean = false;

  constructor(
    private router: Router,
    private toast: ToastController, // Mensaje que aparece abajo al hacer algo (eliminar usuario, eliminar de favoritos)
    public users: UserService, // Sera la lista que usaremos desde el HTML
    public favs: FavoritesService // La lista de usuarios favoritos
  ) {}


  // Método de ciclo de vida que es al crear el componente
  ngOnInit(): void{
    // Para que salga que esta cargado los usuarios
    this.loading = true;
    // Recogemos todos lo usuarios y todos los favoritos
    zip(this.users.getAll(), this.favs.getAll()).subscribe(results =>{
      this.loading = false;
    });
  }

  // Método para ir a la página de Welcome
  public welcome(){
    this.router.navigate(["./welcome"])
  }

  // Recogemos el usuario seleccionado y el fav para añadirlo o eliminarlo
  public onFavClicked(usuario: User, event: UserInfoFavClicked){
    var obs = (event?.fav)?this.favs.addFav(usuario.id):this.favs.deleteFav(usuario.id);
    obs.subscribe({
      next:_=> {
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
        // Creamos el toast y lo presentamos
        this.toast.create(options).then(toast=>toast.present());
      },
      error: err=>{
        console.log(err);
      }
    });
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
