import {Component, Input, OnInit} from '@angular/core';
import {AccountService} from '../../../../service/account.service';
import {IAccount} from '../../../../models/iaccount';
import {FormBuilder} from '@angular/forms';
import {AuthenService} from '../../../../service/authen.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../../service/tokenstorage.service';
import {error} from '@angular/compiler-cli/src/transformers/util';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input()
  friendResult : IAccount[];
  accountId:number;
  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private authenService: AuthenService,
              private route: ActivatedRoute,
              private router: Router,
              private tokenService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.accountId = this.tokenService.getAccount()
  }

  addStatus(event) {
    const st = {
      content: event,
      account: {
        id: this.tokenService.getAccount()
      }
    }

    this.accountService.createStatus(this.accountId,st).subscribe(
      (httpResponse)=>{
        if(httpResponse.message == 'success'){
          alert('ok')
        }else {
          alert("not ok")
        }
      },()=>{
        alert('Lỗi')
      }
    )
  }


}
