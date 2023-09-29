import { Component } from '@angular/core';
import { BehaviorSubject, Observable, observeOn } from 'rxjs';
import { User } from './user';

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

  // Método de ciclo de vida que es al crear el componente
  ngOnInit(): void{

    let index = 0

    // Lista de usuarios a poner en las tarjetas
    let usuarios: User[] = [
      {nombre: "Pablo", apellidos: "García Muñoz", edad: 18},
      {nombre: "Maria", apellidos: "Aurora Rio", edad: 55},
      {nombre: "Josefa", apellidos: "Leon Fernandez", edad: 56},
      {nombre: "Antonio J.", apellidos: "Muñoz Perez", edad: 22},
      {nombre: "Ana M.", apellidos: "Santos Fernandez", edad: 30}
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
  

  
  constructor() {}

}
