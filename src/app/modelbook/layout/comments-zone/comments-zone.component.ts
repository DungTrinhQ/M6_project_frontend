import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentService} from '../../../service/comment/comment.service';
import {Icomment} from '../../../models/icomment';
import {ActivatedRoute} from '@angular/router';
import {LikesService} from '../../../service/likes/likes.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NotificationService} from '../../../service/notification.service';

@Component({
  selector: 'app-comments-zone',
  templateUrl: './comments-zone.component.html',
  styleUrls: ['./comments-zone.component.css']
})
export class CommentsZoneComponent implements OnInit {

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

  showEdit = false;
  editCommentForm: FormGroup;
  currentCommentId:number;

  constructor(
    private commentService:CommentService,
    private likeService: LikesService,
    private fb: FormBuilder,
    private notice: NotificationService
  ) { }

  ngOnInit(): void {
    this.editCommentForm = this.fb.group({
        content: [''],
    }

    )
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


  editSubmit(index: number,comment_id:number) {
    // console.log(this.editCommentForm.value);
    this.comments[index].comment.content = this.editCommentForm.value.content;
    this.commentService.saveComment(this.comments[index].comment,this.status_id,this.current_id).subscribe(
      (response)=>{
        this.showEdit = false;
        this.notice.success("Cập nhật thành công");
        this.currentCommentId = null;
      },()=> this.notice.fail("Lỗi kết nối sever"),
    )
    // this.commentService.saveComment(this.comments[index].comment,this.status_id,this.current_id).subscribe(
    //   (data)=>{

      // }
    // )
  }

  patchValue(index: number,commentId:number) {
    console.log(commentId);
    this.currentCommentId = commentId;
    this.editCommentForm.patchValue(this.comments[index].comment);
    this.showEdit = true;
  }
}
