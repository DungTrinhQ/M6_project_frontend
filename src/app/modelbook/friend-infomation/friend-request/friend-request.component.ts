import { Component, OnInit } from '@angular/core';
import {FriendService} from '../../../service/friend/friend.service';
import {TokenStorageService} from '../../../service/tokenstorage.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {

  current_id:number;
  friendRequestList:any;

  constructor(private friendService: FriendService,
              private tokenStorage: TokenStorageService,
              ) { }

  ngOnInit(): void {
    this.getFriendRequest();

  }

  getFriendRequest(){
    this.current_id = this.tokenStorage.getAccount();
    this.friendService.getRequestList().subscribe((data)=>{
      this.friendRequestList = data;
      console.log(data);
    })
  }

  accept(id: number) {
    this.friendService.acceptRequest(id).subscribe(()=>{
      alert("Đã thêm bạn")
      window.location.reload();
    });

  }

  denied(id: number) {
    this.friendService.deniedRequest(id).subscribe(()=>{
      alert("Đã hủy yêu cầu")
      window.location.reload();
    })

  }
}
