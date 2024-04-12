import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoreComponent } from './score/score.component';
import { RouterModule } from '@angular/router';




@NgModule({
  declarations: [
    ScoreComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

  ]
})
export class GeneralscoreModule { }
