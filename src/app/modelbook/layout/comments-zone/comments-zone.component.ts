import { Component, OnInit } from '@angular/core';
import {CommentService} from '../../../service/comment/comment.service';
import {Icomment} from '../../../models/icomment';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-comments-zone',
  templateUrl: './comments-zone.component.html',
  styleUrls: ['./comments-zone.component.css']
})
export class CommentsZoneComponent implements OnInit {

  comments: Icomment[];

  status_id:number;

  constructor(private commentService:CommentService,
              private activedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.status_id = +this.activedRoute.snapshot.paramMap.get('id');
    this.commentService.getCommentsByStatusId(this.status_id).subscribe(
      (dataResponse)=>{
        this.comments = dataResponse;
        console.log(dataResponse);
      }
    )




  }

}
