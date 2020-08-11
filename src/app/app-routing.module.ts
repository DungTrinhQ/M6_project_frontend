import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './modelbook/layout/register/register.component';
import {LoginComponent} from './modelbook/layout/login/login.component';
import {AuthGaurdService} from './helper/auth-gaurd.service';
import {MainwallComponent} from './modelbook/layout/mainwall/mainwall.component';
import {EditInfoComponent} from './modelbook/account-infomation/edit-info/edit-info.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path: '',canActivate:[AuthGaurdService],component:MainwallComponent},
  {
    path: 'account',
    loadChildren: () => import('./modelbook/account-infomation/account-infomation.module').then(module => module.AccountInfomationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
