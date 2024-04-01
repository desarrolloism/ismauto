import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ValidatetokenComponent } from './validatetoken/validatetoken.component';



@NgModule({
  declarations: [
    LoginComponent,
    ValidatetokenComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
    ValidatetokenComponent
  ]
})
export class LoginModule { }
