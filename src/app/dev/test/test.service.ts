
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private API_URL = 'http://localhost:8080/'

  constructor(
    private http : HttpClient
  ) { }
  getStatus(id: number): Observable<any>{
    return this.http.get(this.API_URL + 'api/get-one-status/' + id);
  }
  editStatus(data : any): Observable<any>{
    return this.http.put(this.API_URL + 'api/edit-status', data);
  }

}
