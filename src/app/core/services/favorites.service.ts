import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fav } from '../interfaces/fav';
import { User } from '../interfaces/user';

// Interfaz de errores
export class FavNotFoundException extends Error{

}

@Injectable({
  providedIn: 'root'
})

// Servicio que vamos a usar para consultar y hacer cosas con los favoritos
export class FavoritesService {

  // Lista privada de los favoritos
  private _favs: BehaviorSubject<Fav[]> = new BehaviorSubject<Fav[]>([])
  // Lista publica que el html va a recibir
  favs$: Observable<Fav[]> = this._favs.asObservable();

  constructor() { }

  /*
  *  Métodos para manejar los favoritos
  */ 

  // Método que obtiene todos los usuarios que son Fav
  public getAll(): Observable<Fav[]>{
    return new Observable(observer => {
      // Lista predeterminada de usuarios favoritos
      let favoritos: Fav[] = [
        {userId: 1},
        {userId: 3},
        {userId: 5}
      ];
      // Le pasamos la lista de usuarios favoritos privada
      this._favs.next(favoritos);
      // Le pasamos al observable que devolvemos los favoritos
      observer.next(favoritos);
      // Completamos el oberservable que devolvemos
      observer.complete();
    });
  }

  // Método para añadir un usuario a fav
  public addFav(userid: number): Observable<Fav>{
    return new Observable(observer => {
      // Copiamos a lista de favoritos
      var _lista = [...this._favs.value];
      // Añadir el id del usuario a la lista de favoritos
      var _usuarioAñadir = {userId: userid};
      // Le añado a la lista de usuarios favoritos
      _lista.push(_usuarioAñadir);
      // Le actualizo la lista de usuarios al nuestro Behavour Subject
      this._favs.next(_lista);
      // Actualizo el observable que devolvemos
      observer.next(_usuarioAñadir);
      // Y lo completamos
      observer.complete();
    });
  }

  // Método para eliminar el fav
  public deleteFav(userid: number): Observable <Fav>{
    return new Observable(observer =>{
      // Copiamos la lista de usuarios favoritos
      var _lista = [...this._favs.value];
      // Buscamos el usuario que debemos eliminar
      var index = _lista.findIndex(f => f.userId==userid)
      // Si encuentra el usuario
      if(index < 0){
        observer.error(new FavNotFoundException);
      } else {
        // Cortamos la lista con todo los favoritos menos el eliminado
        _lista = [..._lista.slice(0, index),..._lista.slice(index+1)];
        // Actualizo la lista privada
        this._favs.next(_lista);
        // Actualizo el observable que devuelvo
        observer.next({userId: userid});
      }
    });
  }

}
