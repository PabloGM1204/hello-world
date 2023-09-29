import { Component } from '@angular/core';
import { BehaviorSubject, Observable, observeOn } from 'rxjs';
import { User } from './user';
import { Router } from '@angular/router';
import { ToastController, ToastOptions } from '@ionic/angular';
import { UserInfoFavClicked } from './user-info/user-info-fav-clicked';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Creamos un BehaviorSubjetct que recibo un tipo generico que en este caso es un array de tipo Usuario y creamos el objeto de ese tipo pero con el array vacio, esta variable recoge de forma privada y lo pasa a _user$
  private _user: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  // Creamos un observable que behaviour lo convirtamos a observable, para que desde la plantilla no podamos meter datos
  user$: Observable<User[]> = this._user.asObservable()

  constructor(
    private router: Router,
    private toast: ToastController
  ) {}

  // Método de ciclo de vida que es al crear el componente
  ngOnInit(): void{

    let index = 0

    // Lista de usuarios a poner en las tarjetas
    let usuarios: User[] = [
      {id: 1, nombre: "Pablo", apellidos: "García Muñoz", edad: 18, fav: true},
      {id: 2,nombre: "Maria", apellidos: "Aurora Rio", edad: 55, fav: false},
      {id: 3, nombre: "Josefa", apellidos: "Leon Fernandez", edad: 56, fav: true},
      {id: 4,nombre: "Antonio J.", apellidos: "Muñoz Perez", edad: 22, fav: false},
      {id: 5,nombre: "Ana M.", apellidos: "Santos Fernandez", edad: 30, fav: true}
    ]

    // Intervalo para que vaya poniendo de uno en uno la tarjeta
    setInterval(()=>{
      if(index < usuarios.length){
        // Guardamos el valor
        let persona: User[] = this._user.value
        // Lo añadimos al array
        persona.push(usuarios[index])
        // Actualizamos los datos para que donde se haya subscrito los reciba
        this._user.next(persona)
        index++
      }
    }, 1000)
  }

  // Recogemos el usuario seleccionado y el el fav para añadirlo o eliminarlo
  public onFavClicked(usuario: User, event: UserInfoFavClicked){
    // Copiamos el array actual
    const users = [...this._user.value];
    // Lo buscamos con el index para cambiar el fav
    var index = users.findIndex((_user)=> _user.id == usuario.id);
    if(index >= 0)
      users[index].fav = event.fav??false; // Cambiamos el fav del usuario
    this._user.next([...users]);
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
