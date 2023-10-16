import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../interfaces/user';

// Interfaz de los métodos 

// Interfaz en caso de error
export class UserNotFoundException extends Error{
  // Si quiero añadir cosas
}

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

  // Método que recoge los usuarios (Al hacerlo sin ninguna conexión a una API usamos un array creado por nostros)
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

  // Método que sirve para eliminar un usuario
  // Recogemos el usuario al que antes le hemos dado click en la papelera y devolvemos un array nueva con la lista de usuarios nueva con el user elegido eliminado
  public deleteUser(user:User): Observable<User[]>{
    return new Observable(observer => {
      // Copiamos el array de usuarios con los usuarios actuales
      var _lista = [...this._user.value];
      // Guardamos el valor del id del usuario al cual le hemos hecho click
      var usuarioSelecionado = _lista.findIndex(u=>u.id==user.id);
      // Si ha encontrado el usuario debe dar un 
      if(usuarioSelecionado >= 0){
        // Actualizo la lista con el slice para que me copie desde la lista hasta el user elegido y desde el user elegido +1 en adelante
        _lista = [..._lista.slice(0, usuarioSelecionado),..._lista.slice(usuarioSelecionado+1)];
        // Le paso la copia a la lista de usuarios privada
        this._user.next(_lista);
        // Le paso al observable que devuelvo la nueva lista
        observer.next(_lista);
      }else{
        observer.error(new UserNotFoundException);
      }
      // Termino el observable
      observer.complete;
    });
  }

  // Método para actualizar el usuario (en este caso para el favorito)
  public updateUser(user: User): Observable<User[]>{
    return new Observable(observer => {
      // Copiamos la lista que tenemos de usuarios
      var _lista = [...this._user.value];
      // Buscamos el usuario seleccionado
      var usuarioSelecionado = _lista.findIndex(u=>u.id==user.id);
      // Si encuentra el usuario seleccionado
      if(usuarioSelecionado >= 0){
        // Le añadimos el usuario a la lista
        _lista[usuarioSelecionado] = user;
        // Le pasamos la lista nueva tanto al observable de esta clase es decir el privado como al observer
        this._user.next(_lista);
        observer.next(_lista);
      } else {
        observer.error(new UserNotFoundException)
      }
      observer.complete;
    });
  }
}
