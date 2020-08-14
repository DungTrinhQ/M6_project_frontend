import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../tokenstorage.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private URL = environment.API_URL;
  private current_id: number;


  constructor(private http: HttpClient,
              private token:TokenStorageService) { }

  deleteStatusById(id:number):Observable<any>{
    return this.http.delete(this.URL+'statuses/'+id+'/delete');

  }
}
