// projects.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CreateprojectComponent } from './createproject/createproject.component';
import { LoginModule } from '../login/login.module';
import { HeaderModule } from '../header/header.module';

//angular material
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select'; 
import {MatListModule} from '@angular/material/list'; 


@NgModule({
  declarations: [
    CreateprojectComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LoginModule,
    HeaderModule,
    //angular material
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatListModule
    
  ],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class ProjectsModule { }
