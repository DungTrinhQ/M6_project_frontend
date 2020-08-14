import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../service/account.service';
import {AuthenService} from '../../../service/authen.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IAccount} from '../../../models/iaccount';
import {Istatus} from '../../../models/istatus';
import {TokenStorageService} from '../../../service/tokenstorage.service';
import {FriendService} from '../../../service/friend/friend.service';
import {Icomment} from '../../../models/icomment';
import {Ifriend} from '../../../models/ifriend';

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
  statusResult: Istatus[];
  comment: Icomment;
  accountId:number;
  isCurrentAccount = false;
  isFriend = false;
  isPending = false;
  isNoRelation = false;

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private authenService: AuthenService,
              private route: ActivatedRoute,
              private router: Router,
              private tokenService: TokenStorageService,
              private friendService: FriendService) {
  }

  path_id = +this.route.snapshot.paramMap.get('id');
  ngOnInit(): void {
    this.accountId = this.tokenService.getAccount();
    this.statusForm = this.fb.group({
      content: ['']
    })
    this.getAccount()
    this.checkRelationShip();
    this.getStatus()
  }

  checkRelationShip(){
    this.friendService.checkRelationShip(this.path_id).subscribe(
      (result)=>{
        switch (result.name){
          case 'none':{
            this.isNoRelation = true;
            break;
          }
          case 'pending':{
            this.isPending = true;
            break;
          }
          case 'friend':{
            this.isFriend = true;
          }
        }
      })
  }

  getAccount() {
    this.accountService.getAccount(this.path_id).subscribe((resp: IAccount) => {
      this.accounts = resp;
    })
  }

  getStatus() {
    this.accountService.getListStatusByAccount(this.path_id).subscribe((resp: Istatus[]) => {
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

  sentFriendRequest() {
    this.friendService.sentFriendRequest(this.path_id).subscribe((data) => {
      if(data.message == 'success'){
        this.isPending = true;
        this.isNoRelation = false;
      }
    })

  }
  getCommentContent(event, id){
    this.comment = {
      content: event.value.content,
      account: {
        id : this.tokenService.getAccount()
  },
      status: {
        id: ['']
      }
    }
    this.accountService.createComment(this.comment, id).subscribe((res) =>{
      this.getStatus()
    },
      error => console.log("error"));
  }
  checkIsFriend(){
     this.accountService.isFriend(this.tokenService.getAccount(), this.id).subscribe((res: Ifriend)=> {
       console.log(res.name)
       if(res.name == "friend" || this.tokenService.getAccount() == this.id){
         this.isFriend = true
       }
       console.log(this.isFriend)
    })
  }
  searchStatusByKeyword(event){
    this.accountService.searchStatus(event, this.tokenService.getAccount()).subscribe((res : Istatus[]) =>{
      this.statusResult = res;
    })
  }
}
