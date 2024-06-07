import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentAbitmediaComponent } from './payment-abitmedia/payment-abitmedia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Select2Component } from './select2/select2.component';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatExpansionModule} from '@angular/material/expansion'; 

@NgModule({
  declarations: [
    PaymentAbitmediaComponent,
    Select2Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    MatAutocompleteModule,
    MatTabsModule,
    MatExpansionModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class EmergentModule { }
