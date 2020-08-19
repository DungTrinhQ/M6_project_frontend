import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditInfoComponent} from './edit-info/edit-info.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';
import { CommentComponent } from './profile/comment/comment.component';
import { SearchStatusComponent } from './profile/search-status/search-status.component';
import {AppModule} from '../../app.module';
import { ShowCommentComponent } from './profile/show-comment/show-comment.component';
import {StatusEditComponent} from '../layout/status-edit/status-edit.component';


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
    CommentComponent,
    SearchStatusComponent,
    ShowCommentComponent,
    StatusEditComponent,
  ],
  imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
  ],
  exports: [
    CommentComponent,
    StatusEditComponent,
  ]
})
export class AccountInfomationModule { }
