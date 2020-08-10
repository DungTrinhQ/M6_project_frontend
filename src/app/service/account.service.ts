import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAccount} from '../models/iaccount';

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

}
