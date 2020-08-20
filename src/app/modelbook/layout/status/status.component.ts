import {Component, Input, OnInit} from '@angular/core';
import {Istatus} from '../../../models/istatus';
import {AccountService} from '../../../service/account.service';
import {TokenStorageService} from '../../../service/tokenstorage.service';
import {StatusService} from '../../../service/status/status.service';
import {Icomment} from '../../../models/icomment';
import {CommentService} from '../../../service/comment/comment.service';
import {NotificationService} from '../../../service/notification.service';
import {LikesService} from '../../../service/likes/likes.service';
import {INewfeedResponse} from '../../../models/response-observable/inewfeed-response';
import {IAccount} from '../../../models/iaccount';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  statuses: Istatus[];
  current_id: number;

  newFeedResponse: INewfeedResponse[];

  comments: Icomment[];

  delete_comment_id:number;

  status_id:number;

  @Input()
  currentAccount:IAccount;

  currentStatus: Istatus = {
    id: 0,
    content:'',
    images:[],
    totalComments:0,
    totalLikes:0,

  };

  new_comment: Icomment = {
    content: '',
    account: {
      id: this.current_id,
    },

  }

  status_id_loading_comments: number;

  total_record:number = 0;
  notEmptyRecord = true;
  notScroll = true;



  constructor(private accountService: AccountService,
              private token: TokenStorageService,
              private statusService: StatusService,
              private commentService: CommentService,
              private notice: NotificationService,
              private likeService: LikesService,) {
  }

  ngOnInit(): void {
    this.current_id = this.token.getAccount();
    this.getFirstNewFeed()
  }


  getFirstNewFeed() {
    this.statusService.getNewFeed2(this.current_id,0).subscribe(
      (newfeed:any) => {
        this.newFeedResponse = newfeed;
        if(newfeed.length == 0){
          this.notEmptyRecord = false;
        }
        this.total_record += newfeed.length;
        this.newFeedResponse.map(
          status1 =>
            status1.status.createDate = new Date(status1.status.createDate));
      }
    );
  }


  deleteStatus(id: number) {
    this.statusService.deleteStatusById(id).subscribe((response) => {
      if (response.message == 'xóa thành công') {
        this.notice.success("Xóa thành công");
        this.updateNewFeed();
      } else {
        this.notice.fail("Thử lại sau");
      }
    }, () => {
      this.notice.fail("Lỗi kết nối");
    });

  }

  getCommentByStatus(id: number) {
    return this.commentService.getCommentsByStatusId(id,this.current_id).toPromise();
  }

  async loadComments(id: number, index: number, statues: INewfeedResponse[]) {
    this.status_id = id;
    const comments = await this.getCommentByStatus(id);
    statues[index].status.comments = comments;
  }

  likeStatus(id: number,index:number) {
    this.likeService.likeStatus(id,this.current_id).subscribe(
      (data)=>{
        if(data.message == 'success'){
          this.notice.success("Like thành công.");
          this.updateNewFeed();
        }else {
          this.notice.fail("Like lỗi, hãy thử lại.");
        }
      },()=>{
        this.notice.fail("Lỗi kết nối.")
      }
    )
  }

  unlikeStatus(status_id: number,index:number) {

    this.likeService.unlikeStatus(this.current_id,status_id).subscribe(
      (response)=>{
        if(response.message == 'success'){
          this.notice.success("Unlike thành công");
          this.updateNewFeed();
        }else {
          this.notice.fail("Unlike thất bại")
        }

      },()=>{
        this.notice.fail("lỗi kết nối");
      }
    )

  }

  addComment(status_id:number,index:number) {
    // @ts-ignore
    const text_value = document.getElementById("newComment"+status_id).value;
    if(text_value == '' || text_value == null){
      this.notice.fail("Bạn chưa nhập gì cả.");
      return;
    }
    this.new_comment.content = text_value;
    this.new_comment.account.id = this.current_id;
    this.commentService.createComment(this.new_comment,status_id).subscribe(
      (response)=>{
        if(response.message == 'success'){
          this.notice.success("Comment thành công");
          this.loadComments(status_id,index,this.newFeedResponse);
          // @ts-ignore
          document.getElementById("newComment"+status_id).value = '';
        }else {
          this.notice.fail("Không thành công, xin thử lại");
        }
      },()=>{
        this.notice.fail("Lỗi kết nối");
      }
    )

  }


  delete_comment(event,status_id,index) {
    this.commentService.deleteComment(event).subscribe(
      (response)=>{
        if(response.message == 'success'){
          this.notice.success("Xóa bình luận thành công.");
          this.loadComments(status_id,index,this.newFeedResponse);
        }else {
          this.notice.fail("Hãy thử lại");
        }
      },()=>{
        this.notice.fail("Lỗi kết nối");
      }
    )

  }

  getStatusForm(status:Istatus) {
    this.currentStatus = status;

  }

  onScroll() {
    if(this.notScroll&& this.notEmptyRecord){
      this.notScroll = false;
      this.getNextNewFeed()
    }

  }

  private getNextNewFeed() {
    this.statusService.getNewFeed2(this.current_id,this.total_record).subscribe(
      (newfeed:any) => {
        if(newfeed.length < 5){
          this.notEmptyRecord = false;
        }
        for(let i = 0;i< newfeed.length;i++){
          this.newFeedResponse.push(newfeed[i]);
        }
        this.total_record += newfeed.length;
        console.log("Bản ghi:" + this.total_record);
        this.notScroll =true;
        this.newFeedResponse.map(
          status1 =>
            status1.status.createDate = new Date(status1.status.createDate));
      },()=>{this.notice.fail("Lỗi kết nối");}
    );
  }

  loadComment(stt_id: number,event){
    this.status_id= stt_id;
  }

  updateNewFeed(){
    this.statusService.updateNewFeed(this.current_id,this.total_record).subscribe(
      (data_response)=>{
        this.newFeedResponse = data_response;
        this.newFeedResponse.map(
          status1 =>
            status1.status.createDate = new Date(status1.status.createDate));
      }
    );
  }



}
