import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ValidatetokenComponent } from './validatetoken/validatetoken.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

@NgModule({
  declarations: [
    LoginComponent,
    ValidatetokenComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  exports: [
    LoginComponent,
    ValidatetokenComponent
  ]
})
export class LoginModule { }
