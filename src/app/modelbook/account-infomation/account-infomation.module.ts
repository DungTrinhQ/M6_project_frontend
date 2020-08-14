import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditInfoComponent} from './edit-info/edit-info.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import { CommentComponent } from './profile/comment/comment.component';


const routes: Routes = [
  {
    path: 'edit',
    component: EditInfoComponent
  },
  {
    path: ':id',
    component: ProfileComponent
  }
]
@NgModule({
  declarations: [
    EditInfoComponent,
    ProfileComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AccountInfomationModule { }
