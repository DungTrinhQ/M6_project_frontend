import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../service/account.service';
import {AuthenService} from '../../../service/authen.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IAccount} from '../../../models/iaccount';
import {Istatus} from '../../../models/istatus';
import {TokenStorageService} from '../../../service/tokenstorage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  statusForm: FormGroup;
  accounts: IAccount = {
    avatarUrl: '',
    name: '',
    email: '',
    password: ''
  };
  status: Istatus[];
  accountId:number;

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private authenService: AuthenService,
              private route: ActivatedRoute,
              private router: Router,
              private tokenService: TokenStorageService) {
  }

  id = +this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.accountId = this.tokenService.getAccount();
    this.statusForm = this.fb.group({
      content: ['']
    })
    this.getAccount()
    this.getStatus()
  }

  getAccount() {
    this.accountService.getAccount(this.id).subscribe((resp: IAccount) => {
      this.accounts = resp;
    })
  }

  getStatus() {
    this.accountService.getListStatusByAccount(this.id).subscribe((resp: Istatus[]) => {
      this.status = resp;
      console.log(this.status);
    })
  }

  addStatus() {
    let newStatus = this.statusForm.value;
    console.log(newStatus);
    const st = {
      content: this.statusForm.value.content,
      account: {
        id: this.tokenService.getAccount()
      }
    }

    this.accountService.createStatus(this.accountId,st).subscribe(
      (httpResponse)=>{
        if(httpResponse.message == 'success'){
          this.getStatus()
          this.statusForm = this.fb.group({
            content:['']
          })
        }else {
          alert("Lỗi")
        }
      },()=>{
        alert("Có lỗi kết nối với back end");
      }
    )
  }
}
