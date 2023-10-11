import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../home/user';
import { Fav } from '../../core/interfaces/fav';

@Pipe({
  name: 'favs'
}) // Clase que usamos para actulizar los usuarios y saber cuales son favoritos y no cogiendo la lista de usuarios normal 
export class FavsPipe implements PipeTransform {
  // Recibe la lista de usuarios y la lista de favoritos para que devuelva con los favoritos actualizados
  transform(users: User[] | null, favs: Fav[] | null): User[] {
    // Copiamos la lista de usuarios
    let _users = [...users??[]];
    // Mapeamos los usuarios
    _users = _users.map(u => {
      return {
        id: u.id,
        nombre: u.nombre,
        apellidos: u.apellidos,
        edad: u.edad,
        fav: favs?.reduce((p, f) => p || f.userId==u.id, false)??false // Va usuario por usuario para coger el fav y preguntar y en el caso de encontrar el cambiado lo actualiza
      }
    });
    return _users;
  }
}
