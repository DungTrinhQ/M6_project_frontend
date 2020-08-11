import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EditInfoComponent} from './edit-info/edit-info.component';
import {RouterModule, Routes} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ProfileComponent} from './profile/profile.component';


const routes: Routes = [
  {
    path: 'edit',
    component: EditInfoComponent
  },
  {
    path: ':id/details',
    component: ProfileComponent
  }
]
@NgModule({
  declarations: [
    EditInfoComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class AccountInfomationModule { }
