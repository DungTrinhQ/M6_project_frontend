import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../../../../service/account.service';
import {IAccount} from '../../../../models/iaccount';
import {TokenStorageService} from '../../../../service/tokenstorage.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input()
  friendResult : IAccount[];

  currentAccount:IAccount = {
    avatarUrl: '',
    name: '',
    email: '',
    password: ''
  };

  constructor(private accountService: AccountService,
              private token:TokenStorageService
  ) { }

  ngOnInit(): void {
    this.accountService.getAccount(this.token.getAccount()).subscribe(
      (data)=> {this.currentAccount = data}

    )
  }


  hideResult() {
    this.friendResult = null;
  }
}
