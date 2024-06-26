import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { MainComponent } from './home/main/main.component';
import { ListComponent } from './maintenance/list/list.component';
import { MaincreateComponent } from './maintenance/maincreate/maincreate.component';
import { MaintDetailComponent } from './maintenance/maint-detail/maint-detail.component';
import { ScoreComponent } from './generalscore/score/score.component';
import { GratitudeComponent } from './generalscore/gratitude/gratitude.component';
import { GuidesComponent } from './manuals/guides/guides.component';
import { MyuserComponent } from './scholarships/myuser/myuser.component';
import { UserdataComponent } from './user/userdata/userdata.component';
import { PaymentAbitmediaComponent } from './emergent/payment-abitmedia/payment-abitmedia.component';
import { ErroruserComponent } from './scholarships/erroruser/erroruser.component';
import { CheckoutComponent } from './emergent/checkout/checkout.component';
import { PaymentAdministrationComponent } from './emergent/payment-administration/payment-administration.component';
import { CreateprojectComponent } from './projects/createproject/createproject.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  // mantenaince list
  { path: 'list', component: ListComponent },
  { path: 'maincreate', component: MaincreateComponent },
  { path: 'maint-detail/:maintId', component: MaintDetailComponent },
  //generalscore
  { path: 'score/:maintId', component: ScoreComponent },
  { path: 'gratitude', component: GratitudeComponent },
  //manuals
  { path: 'guides', component: GuidesComponent },
  //userdata
  { path: 'userdata', component: UserdataComponent },
  //becas
  { path: 'myuser', component: MyuserComponent },
  { path: 'erroruser', component: ErroruserComponent },
  //abitmedia
  { path: 'payment-abitmedia', component: PaymentAbitmediaComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'payment-administration', component: PaymentAdministrationComponent },
  //projects
  { path: 'createproject', component: CreateprojectComponent },


  //redirecciona hacia main siempre debe estar al final para evitar errores
  { path: '**', redirectTo: '/login', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }