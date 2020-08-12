import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../../../service/account.service';
import {IAccount} from '../../../models/iaccount';

@Component({
  selector: 'app-mainwall',
  templateUrl: './mainwall.component.html',
  styleUrls: ['./mainwall.component.css']
})
export class MainwallComponent implements OnInit {

  accountList: IAccount[];

  friendResult : IAccount[];
  keywordSearch : String;
  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.getAccountList();
    this.keywordSearch = '';
  }

  getAccountList():IAccount[]{
    this.accountService.getAccountList().subscribe(
      (data)=>{
        this.accountList = data;
        console.log(data);
      }
    )
    return this.accountList;
  }
  getKeyword(event){

    if(event == ''){
      this.keywordSearch = ' ';
    }
    else
    {
      this.keywordSearch = event;
    }
    this.findFriend();
  }
  findFriend(){
    this.accountService.searchFriend(this.keywordSearch).subscribe((res : IAccount[]) =>{
        this.friendResult = res;
        console.log('thanh cong')
      },
      error =>console.log(this.keywordSearch)
    )
  }

}
