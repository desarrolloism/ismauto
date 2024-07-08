import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from '../login/login.module';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MaincreateComponent } from './maincreate/maincreate.component';
import { MaintDetailComponent } from './maint-detail/maint-detail.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { HeaderModule } from "../header/header.module";
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatListModule} from '@angular/material/list'; 

@NgModule({
    declarations: [
        ListComponent,
        MaincreateComponent,
        MaintDetailComponent,
    ],
    exports: [
        MaincreateComponent,
    ],
    imports: [
        MatCardModule,
        MatDividerModule,
        MatButtonModule,
        CommonModule,
        RouterModule,
        LoginModule,
        FormsModule,
        MatProgressBarModule,
        MatMenuModule,
        MatTooltipModule,
        MatPaginatorModule,
        MatInputModule,
        MatFormFieldModule,
        MatStepperModule,
        ReactiveFormsModule,
        MatSelectModule,
        HeaderModule,
        MatExpansionModule,
        MatListModule
    ]
})
export class MaintenanceModule { }
