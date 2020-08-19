import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAccount} from '../../../../models/iaccount';
import {AccountService} from '../../../../service/account.service';
import {INotificationResponse} from '../../../../models/response-observable/inotification-response';
import {AccountNotificationService} from '../../../../service/notification/account-notification.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output()
  keyWord : EventEmitter<any> = new EventEmitter<any>();

  @Input()
  noteList: INotificationResponse[];


  constructor(
    private accountService : AccountService,
    private acc_notification:AccountNotificationService,

  ) { }

  ngOnInit(): void {
  }

  getKeyWord(event){
    this.keyWord.emit(event);
  }


  tickAsSeen(notification_id: number) {
    this.acc_notification.tickAsSeen(notification_id).subscribe(
      (data)=>{
      }
    )

  }

  reload() {
    window.location.reload();
  }
}
