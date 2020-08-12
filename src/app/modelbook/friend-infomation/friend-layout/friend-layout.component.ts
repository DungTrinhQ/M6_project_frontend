import { Component, OnInit } from '@angular/core';
import {IAccount} from '../../../models/iaccount';
import {FriendService} from '../../../service/friend/friend.service';
import {AccountService} from '../../../service/account.service';
import {TokenStorageService} from '../../../service/tokenstorage.service';

@Component({
  selector: 'app-friend-layout',
  templateUrl: './friend-layout.component.html',
  styleUrls: ['./friend-layout.component.css']
})
export class FriendLayoutComponent implements OnInit {

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
    this.getAccount();
  }

  getAccount() {
    this.current_Id = this.tokenStorage.getAccount();
    this.accountService.getAccount(this.current_Id).subscribe((resp: IAccount) => {
      this.accounts = resp;
    })
  }

}
