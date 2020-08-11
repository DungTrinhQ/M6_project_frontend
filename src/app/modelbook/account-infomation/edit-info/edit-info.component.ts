import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IAccount} from '../../../models/iaccount';
import {AccountService} from '../../../service/account.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.component.html',
  styleUrls: ['./edit-info.component.css']
})
export class EditInfoComponent implements OnInit {
  editUserProfile: FormGroup;
  user: IAccount;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private route: ActivatedRoute
  ) { }
  id = +this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.editUserProfile = this.fb.group({
      id: [''],
      email: [''],
      name: [''],
      password: [''],
      address: [''],
      phoneNumber: [''],
      dateOfBirth: [''],
    });
    this.findUserByID();
    console.log(this.id)
  }
  findUserByID(){
    this.accountService.getAccount(this.id).subscribe((res : IAccount) =>{
      this.user = res;
      this.editUserProfile.patchValue(res);
    })
  }
  editAccountInfo(){
    let data = this.editUserProfile.value;
    this.accountService.editAccountInfo(data, this.id).subscribe((res : IAccount) => {
      this.router.navigate([''])
    })
  }

}
