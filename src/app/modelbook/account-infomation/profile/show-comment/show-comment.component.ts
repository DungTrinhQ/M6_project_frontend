import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Icomment} from '../../../../models/icomment';
import {CommentService} from '../../../../service/comment/comment.service';
import {LikesService} from '../../../../service/likes/likes.service';

@Component({
  selector: 'app-show-comment',
  templateUrl: './show-comment.component.html',
  styleUrls: ['./show-comment.component.css']
})
export class ShowCommentComponent implements OnInit {


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
    private commentService:CommentService,
    private likeService: LikesService
  ) { }

  ngOnInit(): void {

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


}
