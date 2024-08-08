import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePoaComponent } from './home-poa/home-poa.component';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../header/header.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//angular material
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { MatCardModule } from '@angular/material/card';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { CreatepoaComponent } from './createpoa/createpoa.component'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatListModule} from '@angular/material/list';
import { PoaDetailComponent } from './poa-detail/poa-detail.component'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatCheckboxModule} from '@angular/material/checkbox';

//select 2
import { NgSelectModule } from '@ng-select/ng-select';
import { NotStartedDepsComponent } from './not-started-deps/not-started-deps.component';
import { PoalistComponent } from './poalist/poalist.component';
import { DetailFormPoaComponent } from './detail-form-poa/detail-form-poa.component';

@NgModule({
  declarations: [
    HomePoaComponent,
    CreatepoaComponent,
    PoaDetailComponent,
    NotStartedDepsComponent,
    PoalistComponent,
    DetailFormPoaComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule,
    //angular forms
    FormsModule,
    ReactiveFormsModule,
    
    //selet2
    NgSelectModule,

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
    MatSelectModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatCheckboxModule
  ]
})
export class POAModule { }
