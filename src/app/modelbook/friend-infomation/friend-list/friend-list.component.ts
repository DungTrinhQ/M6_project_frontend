import { Component, OnInit } from '@angular/core';
import {FriendService} from '../../../service/friend/friend.service';
import {IAccount} from '../../../models/iaccount';
import {AccountService} from '../../../service/account.service';
import {TokenStorageService} from '../../../service/tokenstorage.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  friendList: any;
  accounts: IAccount = {
    avatarUrl: '',
    name: '',
    email: '',
    password: ''
  };
  current_Id:number;

  constructor(private friendService:FriendService,
              private accountService:AccountService,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.getFriendRequest();
    this.getAccount();
  }
  getAccount() {
    this.current_Id = this.tokenStorage.getAccount();
    this.accountService.getAccount(this.current_Id).subscribe((resp: IAccount) => {
      this.accounts = resp;
    })
  }

  getFriendRequest(){
    this.friendService.getFriendList().subscribe((data)=>{
      this.friendList = data;
      console.log(data);
    })

  }

}
