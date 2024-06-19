import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserdataComponent } from './userdata/userdata.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { LoginModule } from "../login/login.module";




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
        HeaderComponent
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
        MatPaginatorModule
    ]
})
export class UserModule { }
