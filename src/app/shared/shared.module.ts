import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInfoComponent } from './user-info/user-info.component';
import { HighlightDirective } from './directives/highlight.directive';
import { IonicModule } from '@ionic/angular';
import { PrimetaLetraMayuscPipe } from './pipes/primeta-letra-mayusc.pipe';
import { FavsPipe } from './pipes/favs.pipe';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserInfoComponent, 
    HighlightDirective, 
    PrimetaLetraMayuscPipe, 
    FavsPipe,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    UserInfoComponent, 
    HighlightDirective,
    CommonModule,
    IonicModule,
    FormsModule,
    FavsPipe,
    PrimetaLetraMayuscPipe
  ]
})
export class SharedModule { }
