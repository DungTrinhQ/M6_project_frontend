import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IAccount} from '../../../../models/iaccount';
import {AccountService} from '../../../../service/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output()
  keyWord : EventEmitter<any> = new EventEmitter<any>();


  constructor(
    private accountService : AccountService

  ) { }

  ngOnInit(): void {
  }
  getKeyWord(event){
    let data = this.keyWord.emit(event);
  }


}
