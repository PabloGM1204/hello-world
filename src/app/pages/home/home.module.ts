import { NgModule } from '@angular/core';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  imports: [
    HomePageRoutingModule,
    SharedModule
    
  ],
  //Le añadimos los componentes que vamos a usar
  declarations: [HomePage]
})
export class HomePageModule {}
