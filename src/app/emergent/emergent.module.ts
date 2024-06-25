import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentAbitmediaComponent } from './payment-abitmedia/payment-abitmedia.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelect2Module } from 'ng-select2';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { Select2Component } from './select2/select2.component';
import {MatTabsModule} from '@angular/material/tabs'; 
import {MatExpansionModule} from '@angular/material/expansion';
import { CheckoutComponent } from './checkout/checkout.component';
import { RouterModule } from '@angular/router';
import {MatDividerModule} from '@angular/material/divider';
import { PaymentAdministrationComponent } from './payment-administration/payment-administration.component';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip'; 
import { HeaderModule } from '../header/header.module';
import {MatGridListModule} from '@angular/material/grid-list'; 


@NgModule({
  declarations: [
    PaymentAbitmediaComponent,
    Select2Component,
    CheckoutComponent,
    PaymentAdministrationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelect2Module,
    MatAutocompleteModule,
    MatTabsModule,
    MatExpansionModule,
    RouterModule,
    MatDividerModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatTooltipModule,
    HeaderModule,
    MatGridListModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class EmergentModule { }
