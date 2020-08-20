import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IAccount} from '../models/iaccount';
import {TokenStorageService} from './tokenstorage.service';
import {environment} from '../../environments/environment';




@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private URL_API = environment.AUTHEN_URL;
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorageService) { }

  login(credentials:IAccount): Observable<any> {
    return this.http.post(this.URL_API+'login',credentials);
  }

  register(user:IAccount):Observable<any>{
    return this.http.post(this.URL_API+'register',{
      email: user.email,
      name: user.name,
      password: user.password
    },this.httpOptions);
  }

  isLogin(){
    let account = this.tokenStorage.getAccount();
    return !(account===null);
  }
}
