import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendLayoutComponent } from './friend-layout/friend-layout.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';
import {FormsModule} from '@angular/forms';

const routes: Routes = [
  {path:'',children: [
      {path:'request', component: FriendRequestComponent},
    ],component:FriendLayoutComponent},

  ]

@NgModule({
  declarations: [
    FriendListComponent,
    FriendLayoutComponent,
    FriendRequestComponent,
  ],
  exports: [
    FriendListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
  ]
})
export class FriendInfomationModule { }
