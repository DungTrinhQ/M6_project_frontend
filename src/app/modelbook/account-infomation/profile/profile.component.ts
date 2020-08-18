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
import {NotificationService} from '../../../service/notification.service';

declare var $: any;
declare var Swal: any;
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
  statusResultToken: Istatus[];
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
              private friendService: FriendService,
              private notificationService: NotificationService) {
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
      console.log(resp);
      this.status.map(status1 =>{
        status1.createDate = new Date(status1.createDate);
      })
      // console.log(this.status);
    })
  }

  addStatus() {
    const st = {
      content: this.statusForm.value.content,
      account: {
        id: this.tokenService.getAccount()
      }
    }
    if (this.statusForm.value.content == ""){
      this.notificationService.fail("Vui lòng nhập nội dung")
    }else {
      this.accountService.createStatus(this.accountId,st).subscribe(
        (httpResponse)=>{
          if(httpResponse.message == 'success'){
            this.getStatus()
            this.statusForm = this.fb.group({
              content:['']
            })
            this.notificationService.success("Đăng status thành công")
          }else {
            this.notificationService.fail("Lỗi")
          }
        },()=>{
          this.notificationService.fail("Lỗi server không thể đăng")
        }
      )
    }
  }

  sentFriendRequest() {
    this.friendService.sentFriendRequest(this.path_id).subscribe((data) => {
      if(data.message == 'success'){
        this.isPending = true;
        this.isNoRelation = false;
        this.notificationService.success("Đã gửi yêu cầu kết bạn.")
      }else{
        this.notificationService.fail("Không thể gửi yêu cầu kết bạn.")
      }
    },()=>this.notificationService.fail("Lỗi kết nối"))

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
      this.notificationService.success("Comment thành công")
    },
      error => this.notificationService.fail("Xảy ra lỗi"));
  }

  searchStatusByKeyword(event){
    let keyword = event;
    console.log(this.filterByKeyword(keyword))
    this.statusResult = (keyword) ? this.filterByKeyword(keyword) :this.statusResultToken;
  }
  filterByKeyword(keyword){
    return this.status.filter(res => {
      return res.content.toLocaleLowerCase().indexOf(keyword.toLocaleLowerCase()) != -1;
    })
  }
}
