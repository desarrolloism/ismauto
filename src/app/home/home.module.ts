import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { LoginModule } from '../login/login.module';
import { RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    LoginModule,
    RouterModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule
  ]
})
export class HomeModule { }
