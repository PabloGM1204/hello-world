import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/user';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.scss'],
})
export class UserformComponent  implements OnInit {

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {}
  OnApply(){
    var user: User = {
      id:10,
      nombre:"Juan",
      apellidos:"García",
      edad:46,
      fav:false
    }
    this.modal.dismiss(user,"apply");
  }

}
