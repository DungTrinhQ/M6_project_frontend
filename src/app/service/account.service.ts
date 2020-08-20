import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAccount} from '../models/iaccount';
import {Istatus} from '../models/istatus';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private API_URL = 'https://model-book-backend.herokuapp.com/'

  constructor(private  http: HttpClient) { }

  getAccountList():Observable<any>{
    return this.http.get(this.API_URL+'api/account')
  }

  createAccount(data:IAccount):Observable<any>{
    return this.http.post(this.API_URL+'register',data)
  }

  editAccountInfo(data: any, id: number): Observable<any>{
    return this.http.put<IAccount>(this.API_URL + 'api/edit/' + id, data);
  }
  getAccount(id: number): Observable<IAccount>{
    return this.http.get<IAccount>(this.API_URL + 'api/account-details/' + id);
  }
  getListStatusByAccount(id: number):Observable<any>{
    return this.http.get(this.API_URL + 'api/statuses/'+id)
  }

  createStatus(id: number,data: any):Observable<any>{
    return this.http.post(this.API_URL + 'api/'+id+'/create-status',data)
  }
  searchFriend(data : String): Observable<any>{
    return this.http.patch(this.API_URL + 'api/find-list-users', data)
  }
  createComment(data : any, id_status: number): Observable<any>{
    return this.http.post(this.API_URL +'api/comment-create/' + id_status, data)
  }
  getAllComment(id: number): Observable<any>{
    return this.http.get(this.API_URL + 'api/get-comments/' + id)
  }
  isFriend(current_id: number, check_id: number):Observable<any>{
    return this.http.get(this.API_URL + 'api/'+ current_id + '/check_relation/' + check_id);
  }
  searchStatus(data: String, account_id: number): Observable<any>{
    return this.http.patch(this.API_URL + 'api/find-status/' + account_id, data);
  }


}
