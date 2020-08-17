import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {INotificationResponse} from '../../models/response-observable/inotification-response';
import {IResultResponse} from '../../models/response-observable/iresult-response';

@Injectable({
  providedIn: 'root'
})
export class AccountNotificationService {
  private URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getNotifications(account_id:number):Observable<INotificationResponse[]>{
    return this.http.get<INotificationResponse[]>(this.URL+account_id+'/notification');
  }

  tickAsSeen(notification_id:number):Observable<IResultResponse>{
    return this.http.put<IResultResponse>(this.URL+'notification/'+notification_id,null);
  }
}
