import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../../service/account.service';
import {IAccount} from '../../../models/iaccount';

@Component({
  selector: 'app-mainwall',
  templateUrl: './mainwall.component.html',
  styleUrls: ['./mainwall.component.css']
})
export class MainwallComponent implements OnInit {

  accountList: IAccount[];

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.getAccountList();
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

}
