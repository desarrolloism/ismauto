import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { MainComponent } from './home/main/main.component';
import { ListComponent } from './maintenance/list/list.component';
import { MaincreateComponent } from './maintenance/maincreate/maincreate.component';
import { MaintDetailComponent } from './maintenance/maint-detail/maint-detail.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'main', component: MainComponent },
  // mantenaince list
  { path: 'list', component: ListComponent },
  { path: 'maincreate', component: MaincreateComponent },
  { path: 'maint-detail/:maintId', component: MaintDetailComponent },
  { path: '**', redirectTo: '/main', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
