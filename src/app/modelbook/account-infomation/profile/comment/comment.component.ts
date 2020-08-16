import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AccountService} from '../../../../service/account.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  createCommentForm: FormGroup;
  @Output()
  commentConetent : EventEmitter<any> = new EventEmitter<any>();


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
  }

}
