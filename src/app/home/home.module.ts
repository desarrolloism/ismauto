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
import {FormBuilder, Validators ,ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatListModule} from '@angular/material/list';
import { HeaderModule } from '../header/header.module';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { InicioComponent } from './inicio/inicio.component';
import { RepositoryComponent } from './repository/repository.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { PoliciesComponent } from './policies/policies.component';
import { DocumentsComponent } from './documents/documents.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ProcessIsoComponent } from './process-iso/process-iso.component';
import { NormativaIsoComponent } from './normativa-iso/normativa-iso.component'; 
import {MatExpansionModule} from '@angular/material/expansion';
import { PoliciesRepoComponent } from './policies-repo/policies-repo.component';
import { OurPoliticsComponent } from './our-politics/our-politics.component'; 


@NgModule({
  declarations: [
    MainComponent,
    DashboardsComponent,
    InicioComponent,
    RepositoryComponent,
    PoliciesComponent,
    DocumentsComponent,
    ProcessIsoComponent,
    NormativaIsoComponent,
    PoliciesRepoComponent,
    OurPoliticsComponent,
  ],
  imports: [
    CommonModule,
    LoginModule,
    RouterModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatStepperModule,
    MatListModule,
    HeaderModule,
    MatToolbarModule,
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatExpansionModule
  ]
})
export class HomeModule { }
