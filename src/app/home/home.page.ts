import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Lista de usuarios a poner en las tarjetas
  usuarios = [
    {
      nombre: "Pablo", apellidos: "García Muñoz", edad: 18
    },
    {
      nombre: "Maria", apellidos: "Aurora Rio", edad: 55
    },
    {
      nombre: "Josefa", apellidos: "Leon Fernandez", edad: 56
    },
    {
      nombre: "Antonio J.", apellidos: "Muñoz Perez", edad: 22
    },
    {
      nombre: "Ana M.", apellidos: "Santos Fernandez", edad: 30
    }
  ]

  constructor() {}

}
