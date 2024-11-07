import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AgendamentosComponent } from './components/agendamentos/agendamentos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'agendamentos', component: AgendamentosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
