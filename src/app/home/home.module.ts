import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LoginModule } from '../login/login.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    RouterModule
  ]
})
export class HomeModule { }
