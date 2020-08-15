import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './modelbook/layout/register/register.component';
import {LoginComponent} from './modelbook/layout/login/login.component';
import {AuthGaurdService} from './helper/auth-gaurd.service';
import {MainwallComponent} from './modelbook/layout/mainwall/mainwall.component';
import {TestComponent} from './dev/test/test.component';
import {CommentsZoneComponent} from './modelbook/layout/comments-zone/comments-zone.component';

const routes: Routes = [
  {path: 'login',component: LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'test',component:TestComponent},
  {path: '',canActivate:[AuthGaurdService],
    component:MainwallComponent,
    children:[
      {path:'status/:id',component:CommentsZoneComponent}
    ]},
  {
    path: 'account', canActivate:[AuthGaurdService],
    loadChildren: () => import('./modelbook/account-infomation/account-infomation.module').then(module => module.AccountInfomationModule)
  },
  {
    path: 'friends',canActivate:[AuthGaurdService],
    loadChildren: ()=> import('./modelbook/friend-infomation/friend-infomation.module').then(module => module.FriendInfomationModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
