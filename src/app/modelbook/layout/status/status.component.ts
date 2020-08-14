import { Component, OnInit } from '@angular/core';
import {Istatus} from '../../../models/istatus';
import {AccountService} from '../../../service/account.service';
import {TokenStorageService} from '../../../service/tokenstorage.service';
import {StatusService} from '../../../service/status/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statuses:Istatus[];
  current_id:number;

  constructor(private accountService: AccountService,
              private token: TokenStorageService,
              private statusService: StatusService) { }

  ngOnInit(): void {
    this.current_id = this.token.getAccount();
    this.getNewFeed();
  }

  getStatusList(){
    this.accountService.getListStatusByAccount(this.current_id).subscribe(
      (statusList)=>{
        this.statuses = statusList;
      })
  }

  getNewFeed(){
    this.statusService.getNewFeed(this.current_id).subscribe(
      (newfeed: Istatus[])=>{
        this.statuses = newfeed;
      }
    )
  }


  deleteStatus(id: number) {
    this.statusService.deleteStatusById(id).subscribe((response)=>{
      if(response.message =='xóa thành công'){
        alert("xóa thành công");
        this.getNewFeed();
      }else {
        alert("xóa không thành công")
      }
    },()=>{alert("lỗi kết nối")})

  }
}
