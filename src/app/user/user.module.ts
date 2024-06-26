import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdataComponent } from './userdata/userdata.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginModule } from "../login/login.module";
import { HeaderModule } from '../header/header.module';



import { MatCardModule } from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatPaginatorModule} from '@angular/material/paginator';



@NgModule({
    declarations: [
        UserdataComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        LoginModule,
        MatCardModule,
        MatProgressBarModule,
        MatButtonModule,
        MatDividerModule,
        MatMenuModule,
        MatTooltipModule,
        MatPaginatorModule,
        HeaderModule
    ]
})
export class UserModule { }
