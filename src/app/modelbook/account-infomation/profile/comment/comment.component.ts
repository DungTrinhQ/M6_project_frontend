import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountService} from '../../../../service/account.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Icomment} from '../../../../models/icomment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  createCommentForm: FormGroup;

  @Output()
  commentConetent : EventEmitter<any> = new EventEmitter<any>();

  @Input()
  account;

  constructor(
    private fb : FormBuilder
  ) { }

  ngOnInit(): void {
    this.createCommentForm = this.fb.group({
      content: ['']
    })
  }
  getComment(){
    this.commentConetent.emit(this.createCommentForm)
    this.createCommentForm = this.fb.group({
      content: ['']
    })
  }

}
