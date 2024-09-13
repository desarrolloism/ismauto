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
import { ProjListComponent } from './projects/proj-list/proj-list.component';
import { ProjectTasksComponent } from './projects/project-tasks/project-tasks.component';
import { SignaturesComponent } from './projects/signatures/signatures.component';
import { HomePoaComponent } from './poa/home-poa/home-poa.component';
import { CreatepoaComponent } from './poa/createpoa/createpoa.component';
import { PoaDetailComponent } from './poa/poa-detail/poa-detail.component';
import { NotStartedDepsComponent } from './poa/not-started-deps/not-started-deps.component';
import { RepositoryComponent } from './home/repository/repository.component';
import { PoliciesComponent } from './home/policies/policies.component';
import { DocumentsComponent } from './home/documents/documents.component';
import { CitasComponent } from './home/citas/citas.component';
import { UsuarioComponent } from './home/usuario/usuario.component';
import { TipoCitaComponent } from './home/tipo-cita/tipo-cita.component';
import { PersonalComponent } from './home/personal/personal.component';
import { FechasComponent } from './home/fechas/fechas.component';
import { CedulaComponent } from './home/cedula/cedula.component';
import { UserPurcharseComponent } from './shopping/user-purcharse/user-purcharse.component';
import { PoaActivitiesComponent } from './poa/poa-activities/poa-activities.component';


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
  { path: 'proj-list', component: ProjListComponent },
  { path: 'project-tasks/:id', component: ProjectTasksComponent },
  { path: 'signatures/:id', component: SignaturesComponent },
  //poa 
  { path: 'home-poa', component: HomePoaComponent },
  { path: 'createpoa', component: CreatepoaComponent },
  {path: 'poa-detail/:id', component: PoaDetailComponent},
  {path: 'not-started-deps', component: NotStartedDepsComponent},
  {path: 'poa-activities/:poa_id/:act_id', component: PoaActivitiesComponent},


  //repository
  { path: 'iso', component: RepositoryComponent },
  { path: 'politicas-y-normativas', component: PoliciesComponent },
  { path: 'documentos', component: DocumentsComponent },

  //citas
  { path: 'citas', component: CitasComponent },
  { path: 'usuario', component: UsuarioComponent },
  { path: 'tipo-cita', component: TipoCitaComponent },
  { path: 'personal', component: PersonalComponent },
  { path: 'fechas', component: FechasComponent },
  { path: 'cedula', component: CedulaComponent },

  //compras 
  { path: 'compra-usuario', component: UserPurcharseComponent },

  //redirecciona hacia main siempre debe estar al final para evitar errores
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }