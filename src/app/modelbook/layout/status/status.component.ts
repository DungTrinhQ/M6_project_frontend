import {Component, Input, OnInit} from '@angular/core';
import {Istatus} from '../../../models/istatus';
import {AccountService} from '../../../service/account.service';
import {TokenStorageService} from '../../../service/tokenstorage.service';
import {StatusService} from '../../../service/status/status.service';
import {Icomment} from '../../../models/icomment';
import {CommentService} from '../../../service/comment/comment.service';
import {NotificationService} from '../../../service/notification.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statuses: Istatus[];
  current_id: number;

  comments: Icomment[];

  status_id_loading_comments: number;



  constructor(private accountService: AccountService,
              private token: TokenStorageService,
              private statusService: StatusService,
              private commentService: CommentService,
              private notice: NotificationService) {
  }

  ngOnInit(): void {
    this.current_id = this.token.getAccount();
    this.getNewFeed();
  }

  getStatusList() {
    this.accountService.getListStatusByAccount(this.current_id).subscribe(
      (statusList) => {
        this.statuses = statusList;
      });
  }

  getNewFeed() {
    this.statusService.getNewFeed(this.current_id).subscribe(
      (newfeed: Istatus[]) => {
        this.statuses = newfeed;
        this.statuses.map(
          status1 =>
            status1.createDate = new Date(status1.createDate));
      }
    );
  }


  deleteStatus(id: number) {
    this.statusService.deleteStatusById(id).subscribe((response) => {
      if (response.message == 'xóa thành công') {
        alert('xóa thành công');
        this.getNewFeed();
      } else {
        alert('xóa không thành công');
      }
    }, () => {
      alert('lỗi kết nối');
    });

  }

  getCommentByStatus(id: number) {
    return this.commentService.getCommentsByStatusId(id).toPromise();
  }

  async loadComments(id: number, index: number, statues: Istatus[]) {
    const comments = await this.getCommentByStatus(id);
    statues[index].comments = comments;
    console.log(comments);
  }
}
