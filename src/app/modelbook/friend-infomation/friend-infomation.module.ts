import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { FriendListComponent } from './friend-list/friend-list.component';

const routes: Routes = [
  {path:'',component:FriendListComponent}

  ]

@NgModule({
  declarations: [
    FriendListComponent,
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
