import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './modelbook/layout/register/register.component';
import {LoginComponent} from './modelbook/layout/login/login.component';
import {AuthGaurdService} from './helper/auth-gaurd.service';
import {MainwallComponent} from './modelbook/layout/mainwall/mainwall.component';

const routes: Routes = [
  {path: '',children: [
      {path:'register', component:RegisterComponent},
      {path:'login',component:LoginComponent}
    ]},
  {path: 'wall',canActivate:[AuthGaurdService],component:MainwallComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
