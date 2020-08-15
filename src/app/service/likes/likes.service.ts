import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IResultResponse} from '../../models/response-observable/iresult-response';

@Injectable({
  providedIn: 'root'
})
export class LikesService {

  private URL = environment.API_URL;

  constructor(private http:HttpClient) {
  }

  likeStatus(status_id: number, current_account_id:number):Observable<any>{
    return this.http.post(this.URL+current_account_id+'/like/'+status_id,null);
  }

  unlikeStatus(status_id:number):Observable<IResultResponse>{
    return this.http.delete<IResultResponse>(this.URL+status_id+'/unlike');
  }
}
