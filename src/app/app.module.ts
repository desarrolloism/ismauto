import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { HomeModule } from './home/home.module';
import { MaintenanceModule } from './maintenance/maintenance.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import { GeneralscoreModule } from './generalscore/generalscore.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    MatSliderModule,
    MatInputModule,
    MatCardModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    FormsModule,
    MatDatepickerModule,
    MatRadioModule,
    MaintenanceModule,
    GeneralscoreModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
