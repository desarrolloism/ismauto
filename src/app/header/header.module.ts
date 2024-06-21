import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderAppComponent } from './header-app/header-app.component';
import { RouterModule } from '@angular/router';

//materialangular
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    HeaderAppComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  exports: [
    HeaderAppComponent
  ]
})
export class HeaderModule { }
