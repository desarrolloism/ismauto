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
import { ProjListComponent } from './proj-list/proj-list.component'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatBadgeModule} from '@angular/material/badge';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component'; 
import {MatGridListModule} from '@angular/material/grid-list';
import {MatExpansionModule} from '@angular/material/expansion'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import { SignaturesComponent } from './signatures/signatures.component'; 


@NgModule({
  declarations: [
    CreateprojectComponent,
    ProjListComponent,
    ProjectTasksComponent,
    SignaturesComponent
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
    MatListModule,
    MatTooltipModule,
    MatTableModule,
    MatMenuModule,
    MatBadgeModule,
    MatGridListModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatRadioModule
  ],
  providers: [
    provideNativeDateAdapter()
  ]
})
export class ProjectsModule { }
