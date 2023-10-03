import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './home/user';

// Interfaz de los métodos 

@Injectable({
  providedIn: 'root'
})

// Servicio que vamos a usar para consultar o hacer cosas con los usuarios
export class UserService {
  
  // Creamos un BehaviorSubjetct que recibo un tipo generico que en este caso es un array de tipo Usuario y creamos el objeto de ese tipo pero con el array vacio, esta variable recoge de forma privada y lo pasa a _user$
  private _user: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])
  // Creamos un observable que behaviour lo convirtamos a observable, para que desde la plantilla no podamos meter datos
  user$: Observable<User[]> = this._user.asObservable()

  constructor() { }

  /*
  *  Métodos para manejar los usuarios
  */

  // Método que recoge los usuarios (Al hacerlo sin ninguna conexión a una API usamos un array creado por nostros), devuelve
  // Devuelve un observable con todos los usuarios
  public getAll(): Observable<User[]>{
    // En el mismo return creo el observable y le doy los datos
    return new Observable(observer => {
      // Método que hace esperar 1 s para parecer que parezca real
      setTimeout(() => {
        // Lista de usuarios a poner en las tarjetas
        let usuarios: User[] = [
          {id: 1, nombre: "Pablo", apellidos: "García Muñoz", edad: 18, fav: true},
          {id: 2,nombre: "Maria", apellidos: "Aurora Rio", edad: 55, fav: false},
          {id: 3, nombre: "Josefa", apellidos: "Leon Fernandez", edad: 56, fav: true},
          {id: 4,nombre: "Antonio J.", apellidos: "Muñoz Perez", edad: 22, fav: false},
          {id: 5,nombre: "Ana M.", apellidos: "Santos Fernandez", edad: 30, fav: true}
        ];
        // Guardo en mi variable privada dentro de la clase todos los usuarios
        this._user.next(usuarios);
        // Tambien lo guardo en el observable que devuelvo
        observer.next(usuarios);
        // Para decir que hemos terminado
        observer.complete();
        // Espero 1 s para hacerlo realista
      }, 1000 );
    });
  }

  
}
