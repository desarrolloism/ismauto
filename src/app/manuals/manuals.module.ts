// import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuidesComponent } from './guides/guides.component';
import { MaintenanceModule } from '../maintenance/maintenance.module';
import { HeaderComponent } from '../maintenance/header/header.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
// ...

@NgModule({
  declarations: [
    GuidesComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MaintenanceModule,
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})

export class ManualsModule { }
