import { Component, OnInit } from '@angular/core';
import {FriendService} from '../../../service/friend/friend.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {

  friendList: any;

  constructor(private friendService:FriendService) { }

  ngOnInit(): void {
    this.getFriendRequest();
  }

  getFriendRequest(){
    this.friendService.getFriendList().subscribe((data)=>{
      this.friendList = data;
      console.log(data);
    })

  }

}
