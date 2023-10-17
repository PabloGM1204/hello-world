import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { HighlightDirective } from './directives/highlight.directive';
import { IonicModule } from '@ionic/angular';
import { PrimetaLetraMayuscPipe } from './pipes/primeta-letra-mayusc.pipe';
import { FavsPipe } from './pipes/favs.pipe';
import { FormsModule } from '@angular/forms';
import { UserDetailComponent } from './components/user-detail/user-detail.component';



@NgModule({
  declarations: [
    // Componentes
    UserInfoComponent, 
    UserDetailComponent,
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
    UserDetailComponent,
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
