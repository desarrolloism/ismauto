import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score/score.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { GratitudeComponent } from './gratitude/gratitude.component';



@NgModule({
  declarations: [
    ScoreComponent,
    GratitudeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class GeneralscoreModule { }
