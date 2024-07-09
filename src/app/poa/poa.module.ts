import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePoaComponent } from './home-poa/home-poa.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';

//angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { MatCardModule } from '@angular/material/card';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { CreatepoaComponent } from './createpoa/createpoa.component'; 
import {MatSelectModule} from '@angular/material/select'; 


@NgModule({
  declarations: [
    HomePoaComponent,
    CreatepoaComponent,

  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,

    //angular forms
    FormsModule,
    ReactiveFormsModule,

    //angular material
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatTooltipModule,
    MatCardModule,
    MatBottomSheetModule,
    MatSelectModule
  ]
})
export class POAModule { }
