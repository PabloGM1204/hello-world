import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent  implements OnInit {

  //Atributos del modulo
  @Input() usuario?:{
    nombre?: string,
    apellidos?: string,
    edad?: number
  }

  constructor() { }

  ngOnInit() {}

}
