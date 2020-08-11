import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../service/account.service';
import {AuthenService} from '../../../service/authen.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IAccount} from '../../../models/iaccount';
import {Istatus} from '../../../models/istatus';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  account:IAccount = {
    avatarUrl: '',
    name:'',
    email:'',
    password:''
  };
  status: Istatus[];

  constructor(private accountService:AccountService,
              private fb:FormBuilder,
              private authenService:AuthenService,
              private route: ActivatedRoute,
              private router:Router) { }

  id = +this.route.snapshot.paramMap.get('id');
  statusForm: FormGroup;

  ngOnInit(): void {
    if(!this.authenService.isLogin()){
      alert("Bạn chưa đăng nhập")
      this.router.navigate(['login'])
    }
    this.getAccount(),
      this.getStatus()
  }

  getAccount(){
    this.accountService.getAccount(this.id).subscribe((resp: IAccount)=>{
      this.account = resp;
    })
  }

  getStatus(){
    this.accountService.getListStatusByAccount(this.id).subscribe((resp: Istatus[])=>{
      this.status = resp;
      console.log(this.status);
    })
  }

  addStatus() {
    let newStatus: Istatus = this.statusForm.value;
    this.accountService.createStatus(newStatus).subscribe(()=>{
      alert('ok')
    },
      ()=>{
      alert('lỗi')
      });
  }
}
