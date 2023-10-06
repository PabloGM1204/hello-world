import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { PrimetaLetraMayuscPipe } from '../pipes/primeta-letra-mayusc.pipe';
import { FavsPipe } from './favs.pipe';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  //Le añadimos los componentes que vamos a usar
  declarations: [HomePage, UserInfoComponent, PrimetaLetraMayuscPipe, FavsPipe]
})
export class HomePageModule {}
