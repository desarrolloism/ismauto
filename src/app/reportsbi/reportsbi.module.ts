import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndicatorsComponent } from './indicators/indicators.component';
import { HeaderModule } from "../header/header.module";
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    IndicatorsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HeaderModule
]
})
export class ReportsbiModule { }
