import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAccount} from '../models/iaccount';




@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private URL_API = 'http://localhost:8080/';
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  login(credentials:IAccount): Observable<any> {
    return this.http.post(this.URL_API+'login',{
      email: credentials.email,
      password: credentials.password
    },this.httpOptions);
  }

  register(user:IAccount):Observable<any>{
    return this.http.post(this.URL_API+'register',{
      email: user.email,
      name: user.name,
      password: user.password
    },this.httpOptions);
  }
}
