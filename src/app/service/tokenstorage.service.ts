import { Injectable } from '@angular/core';
import {IAccount} from '../models/iaccount';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private TOKEN_KEY = 'auth-token';
  private USER_KEY = 'auth-user';


  constructor() { }

  signOut():void{
    window.localStorage.clear();
  }

  public saveToken(token:string):void{
    window.localStorage.removeItem(this.TOKEN_KEY);
    window.localStorage.setItem(this.TOKEN_KEY,token);
  }

  public getToken():string{
    return localStorage.getItem(this.TOKEN_KEY);
  }

  public saveAccount(account:any):void{
    window.localStorage.removeItem(this.USER_KEY);
    window.localStorage.setItem(this.USER_KEY,JSON.stringify(account));
  }

  public getAccount():any{
    return JSON.parse(localStorage.getItem(this.USER_KEY));
  }
}
