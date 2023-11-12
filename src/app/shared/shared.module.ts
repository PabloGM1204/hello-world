import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { HighlightDirective } from './directives/highlight.directive';
import { IonicModule } from '@ionic/angular';
import { PrimetaLetraMayuscPipe } from './pipes/primeta-letra-mayusc.pipe';
import { FavsPipe } from './pipes/favs.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    // Componentes
    UserInfoComponent, 
    UserDetailComponent,
    LoginFormComponent,
    // Directivas
    HighlightDirective, 
    // Pipes
    PrimetaLetraMayuscPipe,
    FavsPipe
  ],
  imports: [
    // Modulos
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // Componentes
    UserInfoComponent,
    UserDetailComponent,
    LoginFormComponent,
    // Directivas
    HighlightDirective,
    // Modulos
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    // Pipes
    FavsPipe,
    PrimetaLetraMayuscPipe,
  ]
})
export class SharedModule { }
