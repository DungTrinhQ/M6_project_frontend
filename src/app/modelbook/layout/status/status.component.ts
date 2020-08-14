import { Component, OnInit } from '@angular/core';
import {Istatus} from '../../../models/istatus';
import {AccountService} from '../../../service/account.service';
import {TokenStorageService} from '../../../service/tokenstorage.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statuses:Istatus[];
  current_id:number;

  constructor(private accountService: AccountService,
              private token: TokenStorageService) { }

  ngOnInit(): void {
    this.current_id = this.token.getAccount();
    this.accountService.getListStatusByAccount(this.current_id).subscribe(
      (statusList)=>{
      this.statuses = statusList;
    })
  }

}
