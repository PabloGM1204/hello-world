import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { HighlightDirective } from './directives/highlight.directive';
import { IonicModule } from '@ionic/angular';
import { PrimetaLetraMayuscPipe } from './pipes/primeta-letra-mayusc.pipe';
import { FavsPipe } from './pipes/favs.pipe';
import { FormsModule } from '@angular/forms';
import { UserformComponent } from './components/userform/userform.component';



@NgModule({
  declarations: [
    // Componentes
    UserInfoComponent, 
    UserformComponent,
    // Directivas
    HighlightDirective, 
    // Pipes
    PrimetaLetraMayuscPipe, 
    FavsPipe,
  ],
  imports: [
    // Modulos
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    // Componentes
    UserInfoComponent,
    UserformComponent,
    // Directivas
    HighlightDirective,
    // Modulos
    CommonModule,
    IonicModule,
    FormsModule,
    // Pipes
    FavsPipe,
    PrimetaLetraMayuscPipe,
  ]
})
export class SharedModule { }
