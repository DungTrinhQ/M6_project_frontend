import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Istatus} from '../../../models/istatus';
import {TokenStorageService} from '../../../service/tokenstorage.service';
import {IImage} from '../../../models/iimage';
import {NotificationService} from '../../../service/notification.service';
import {StatusService} from '../../../service/status/status.service';
import {IAccount} from '../../../models/iaccount';
import {Router} from '@angular/router';

@Component({
  selector: 'app-status-form',
  templateUrl: './status-form.component.html',
  styleUrls: ['./status-form.component.css']
})
export class StatusFormComponent implements OnInit {

  @Input()
  currentAccount:IAccount = {
    avatarUrl: '',
    name: '',
    email: '',
    password: ''
  };
  newStatus:FormGroup;
  imgList: IImage[];

  constructor(private fb:FormBuilder,
              private token: TokenStorageService,
              private notice: NotificationService,
              private statusService: StatusService,
              private route:Router) { }

  ngOnInit(): void {
    this.newStatus = this.fb.group({
        content: [''],

    })
  }

  addStatus() {
    const newStatus:Istatus = {
      content: this.newStatus.value.content,
      account: {
        id: this.currentAccount.id,
      },
      // images: this.imgList
    }
    if(newStatus.content == ''){
      this.notice.fail("Hãy điền vào form.");
      return;
    }else {
      this.statusService.createStatus(this.currentAccount.id,newStatus).subscribe(
        (data)=>{
          if(data.message == 'success'){
            this.notice.success("Đăng status thành công!");
            window.location.reload();
            this.newStatus = this.fb.group({
              content: [''],
            })
          }else {
            this.notice.fail("Đăng thất bại :(")
          }
        },()=>{
          this.notice.fail("Lỗi kết nối")
        }
      )
    }
  }
}
