import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../tokenstorage.service';

@Injectable({
  providedIn: 'root'
})
export class FriendService{

  private URL_FRIEND_API = 'http://localhost:8080/api/';
  private account_id:number;

  constructor(private http:HttpClient,
              private tokenStorage: TokenStorageService ) { }


  sentFriendRequest(id:number):Observable<any>{
    this.account_id = this.tokenStorage.getAccount();
    return this.http.get(this.URL_FRIEND_API+this.account_id+'/friend_request/'+id);
  }

  getFriendList():Observable<any>{
    this.account_id = this.tokenStorage.getAccount();
    return this.http.get(this.URL_FRIEND_API+this.account_id+'/friends');

  }

  getRequestList():Observable<any>{
    this.account_id = this.tokenStorage.getAccount();
    return this.http.get(this.URL_FRIEND_API+this.account_id+'/friend_request_response');
  }
}
