import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../tokenstorage.service';
import {IRelationship} from '../../models/response-observable/irelationship';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FriendService{

  private URL_FRIEND_API = environment.API_URL;
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

  acceptRequest(request_id:number):Observable<any>{
    return this.http.put(this.URL_FRIEND_API+'friend_request_response/'+request_id,null);
  }

  deniedRequest(request_id:number):Observable<any>{
    return this.http.delete(this.URL_FRIEND_API+'friend_request_response/'+request_id);
  }

  checkRelationShip(check_id:number):Observable<IRelationship>{
    this.account_id = this.tokenStorage.getAccount();
    return this.http.get(this.URL_FRIEND_API+this.account_id+'/check_relation/'+check_id);
  }
}
