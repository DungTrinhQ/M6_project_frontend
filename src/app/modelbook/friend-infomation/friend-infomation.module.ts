import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendLayoutComponent } from './friend-layout/friend-layout.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';

const routes: Routes = [
  {path:'',children: [
      {path:'request', component: FriendRequestComponent},
      {path: 'list',component: FriendListComponent}
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
  ]
})
export class FriendInfomationModule { }
