import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAccount} from '../models/iaccount';
import {Istatus} from '../models/istatus';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private API_URL = 'http://localhost:8080/'

  constructor(private  http: HttpClient) { }

  getAccountList():Observable<any>{
    return this.http.get(this.API_URL+'api/account')
  }

  createAccount(data:IAccount):Observable<any>{
    return this.http.post(this.API_URL+'register',data,{responseType: 'text'})
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

  createStatus(data: Istatus):Observable<any>{
    return this.http.post(this.API_URL + 'api/create-status',data)
  }
  searchFriend(data : String): Observable<any>{
    return this.http.patch(this.API_URL + 'api/find-list-users', data)
  }

}
