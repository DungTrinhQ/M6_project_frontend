
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Icomment} from '../../../../models/icomment';
import {CommentService} from '../../../../service/comment/comment.service';
import {LikesService} from '../../../../service/likes/likes.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TokenStorageService} from '../../../../service/tokenstorage.service';
import {AccountService} from '../../../../service/account.service';
import {NotificationService} from '../../../../service/notification.service';
import {INewfeedResponse} from '../../../../models/response-observable/inewfeed-response';

@Component({
  selector: 'app-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrls: ['./show-comment.component.css']
})
export class ShowCommentComponent implements OnInit {
  createCommentForm: FormGroup;
  comment: Icomment;
  accountID: number;
  newFeedResponse: INewfeedResponse[];


  editCommentID: number;

  @Output()
  commentResp = new EventEmitter();

  @Input()
  comments: Icomment[];

  @Input()
  current_id:number;

  @Output()
  delete_comment_id = new EventEmitter<number>();

  @Input()
  status_id:number;

  constructor(
    private fb : FormBuilder,
    private commentService:CommentService,
    private likeService: LikesService,
    private accountService: AccountService,
    private tokenStorageService: TokenStorageService,
    private notification: NotificationService
  ) { }

  ngOnInit(): void {
    this.createCommentForm = this.fb.group({
      content: ['']
    })
  }

  getComment_id(id: number) {
    this.delete_comment_id.emit(id);
  }

  getComment(status_id: number){
    this.commentService.getCommentResponse(status_id,this.current_id).subscribe((resp:any[])=>{
      this.comments = resp;
    });
  }

  likeComment(comment_id: number,event){

    this.likeService.likeComment(this.current_id, comment_id).subscribe((resp) => {
      this.getComment(this.status_id);
    })
    this.commentResp.emit(event);

  }

  unLikeComment(comment_id: number,event){

    this.likeService.unlikeComment(this.current_id, comment_id).subscribe((resp) => {
      this.getComment(this.status_id);
    })
    this.commentResp.emit(event);
  }

  editComment(commentID: number, event){
    console.log(commentID)
    // this.editCommentID = commentID;
    // this.commentService.getCommentByID(commentID).subscribe((res: Icomment) =>{
    //   this.comment = res;
    //   this.createCommentForm.patchValue(res);
    // })
    // this.commentResp.emit(event);
  }
  saveComment(commentID: number){
    this.comment.content = this.createCommentForm.value.content;
    this.accountID = this.tokenStorageService.getAccount();
    this.commentService.saveComment(this.comment, this.status_id, this.accountID).subscribe((res) =>{
      this.notification.success("Comment thành công")
        this.getComment(this.status_id);
      },
      error => this.notification.fail("Xảy ra lỗi"));
    this.editCommentID = -1;
  }


}
