import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../../../service/account.service';
import {IAccount} from '../../../models/iaccount';
import {NotificationService} from '../../../service/notification.service';
import {INotificationResponse} from '../../../models/response-observable/inotification-response';
import {AccountNotificationService} from '../../../service/notification/account-notification.service';
import {TokenStorageService} from '../../../service/tokenstorage.service';

@Component({
  selector: 'app-mainwall',
  templateUrl: './mainwall.component.html',
  styleUrls: ['./mainwall.component.css']
})
export class MainwallComponent implements OnInit {

  accountList: IAccount[];

  friendResult : IAccount[];
  keywordSearch : String;

  current_id:number;

  notificationList: INotificationResponse[]=[

  ];
  constructor(private accountService:AccountService,
              private acc_notification: AccountNotificationService,
              private token: TokenStorageService,
              private notice:NotificationService) { }

  ngOnInit(): void {
    this.keywordSearch = '';
    this.current_id = this.token.getAccount();
    this.getNotificationList();
  }

  getAccountList():IAccount[]{
    this.accountService.getAccountList().subscribe(
      (data)=>{
        this.accountList = data;

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
      },
      error =>
        this.notice.fail("Lỗi kết nối")
    )
  }

  getNotificationList(){
    // console.log(this.current_id);
    this.acc_notification.getNotifications(this.current_id).subscribe(
      (data)=>{
        this.notificationList = data;
        console.log(this.notificationList);
      }
    )


  }

}
