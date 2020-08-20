import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../tokenstorage.service';
import {Istatus} from '../../models/istatus';
import {INewfeedResponse} from '../../models/response-observable/inewfeed-response';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private URL = environment.API_URL;


  constructor(private http: HttpClient,
              private token:TokenStorageService) { }

  deleteStatusById(id:number):Observable<any>{
    return this.http.delete(this.URL+'statuses/'+id+'/delete');

  }

  getNewFeed(id:number):Observable<Istatus[]>{
    return this.http.get<Istatus[]>(this.URL+'newfeed/'+id);

  }

  getOneStatus(id:number):Observable<Istatus>{
    return this.http.get<Istatus>(this.URL+'get-one-status/'+id);
  }

  getNewFeed2(id:number,total_record:number):Observable<Istatus[]>{
    return this.http.get<Istatus[]>(this.URL+'newfeed2/'+id+'/'+total_record);
  }

  createStatus(id: number,data: Istatus):Observable<any>{
    return this.http.post(this.URL +id+'/create-status',data);
  }

  editStatus(data : any): Observable<any>{
    return this.http.put(this.URL + 'edit-status', data);
  }

  updateNewFeed(id:number,total_record:number):Observable<INewfeedResponse[]>{
    return this.http.get<INewfeedResponse[]>(this.URL+'newfeed/update/'+id+'/'+total_record);
  }
}
