import {Component, Input, OnInit} from '@angular/core';
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

  status_id:number;

  constructor(private commentService:CommentService,
              private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }

}
