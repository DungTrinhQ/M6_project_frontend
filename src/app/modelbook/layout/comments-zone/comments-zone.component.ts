import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentService} from '../../../service/comment/comment.service';
import {Icomment} from '../../../models/icomment';
import {ActivatedRoute} from '@angular/router';
import {LikesService} from '../../../service/likes/likes.service';

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
