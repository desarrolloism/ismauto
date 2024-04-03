import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from '../login/login.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import { MaincreateComponent } from './maincreate/maincreate.component';
import { MaintDetailComponent } from './maint-detail/maint-detail.component';


@NgModule({
  declarations: [
    ListComponent,
    HeaderComponent,
    MaincreateComponent,
    MaintDetailComponent
  ],
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    CommonModule,
    RouterModule,
    LoginModule,
    FormsModule
  ]
})
export class MaintenanceModule { }
