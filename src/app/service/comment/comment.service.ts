import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Icomment} from '../../models/icomment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private URL = environment.API_URL;

  constructor(private http:HttpClient) { }

  getCommentsByStatusId(status_id:number):Observable<any>{
    return this.http.get(this.URL+'get-comments/'+status_id)
  }
}
