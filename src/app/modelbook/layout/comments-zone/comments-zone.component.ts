import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CommentService} from '../../../service/comment/comment.service';
import {Icomment} from '../../../models/icomment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comments-zone',
  templateUrl: './comments-zone.component.html',
  styleUrls: ['./comments-zone.component.css']
})
export class CommentsZoneComponent implements OnInit {

  @Input()
  comments: Icomment[];

  @Input()
  current_id:number;

  @Output()
  delete_comment_id = new EventEmitter<number>();

  status_id:number;

  constructor(
    private commentService:CommentService,
  ) { }

  ngOnInit(): void {

  }

  getComment_id(id: number) {
    this.delete_comment_id.emit(id);
  }
}
