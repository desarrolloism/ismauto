import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPurcharseComponent } from './user-purcharse/user-purcharse.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { FormsModule } from '@angular/forms';

//MATERIAL ANGULAR
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatDatepickerModule} from '@angular/material/datepicker'; 

// ngSelect
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    UserPurcharseComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    FormsModule,

    //materialangular
    MatExpansionModule,
    MatButtonModule,
    MatDatepickerModule,

    // ngSelect
    NgSelectModule

  ]
})
export class ShoppingModule { }
