import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../../../../../service/tokenstorage.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent implements OnInit {
  account_id:number;
  constructor(private token:TokenStorageService) { }

  ngOnInit(): void {
    this.account_id= this.token.getAccount();
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
