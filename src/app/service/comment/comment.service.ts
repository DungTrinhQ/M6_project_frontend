import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Icomment} from '../../models/icomment';
import {IResultResponse} from '../../models/response-observable/iresult-response';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private URL = environment.API_URL;

  constructor(private http:HttpClient) { }

  getCommentsByStatusId(status_id:number,account_id: number):Observable<any>{
    return this.http.get(this.URL+'response-comment/' + status_id + '/' + account_id);
  }

  getCommentResponse(status_id: number,account_id: number):Observable<any>{
    return this.http.get(this.URL + 'response-comment/' + status_id + '/' + account_id)
  }

  createComment(data : Icomment, id_comment: number): Observable<any>{
    return this.http.post(this.URL +'add-comment/' + id_comment, data);
  }

  deleteComment(comment_id:number):Observable<IResultResponse>{
    return this.http.delete<IResultResponse>(this.URL+'comment-delete/'+comment_id);
  }

  getCommentByID(comment_id: number): Observable<any>{
    return this.http.get(this.URL+'comment/'+comment_id);
  }
  saveComment(data: any, status_id: number, account_id: number ): Observable<any>{
    return this.http.put(this.URL+'comment-edit/' + account_id + '/' + status_id , data );

  }

  updateComment(data:any,comment_id:number):Observable<IResultResponse>{
    return this.http.put<IResultResponse>(this.URL+'comment/'+comment_id+'/update',data)
  }
}
