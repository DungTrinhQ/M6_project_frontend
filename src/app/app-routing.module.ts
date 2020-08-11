import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './modelbook/layout/register/register.component';
import {LoginComponent} from './modelbook/layout/login/login.component';
import {AuthGaurdService} from './helper/auth-gaurd.service';
import {MainwallComponent} from './modelbook/layout/mainwall/mainwall.component';
import {EditInfoComponent} from './modelbook/account-infomation/edit-info/edit-info.component';
import {ProfileComponent} from './modelbook/account-infomation/profile/profile.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path: '',canActivate:[AuthGaurdService],component:MainwallComponent},
  {path: 'account',children: [{
    path: ':id/edit', component: EditInfoComponent
    },
      {path: ':id/details', component: ProfileComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
