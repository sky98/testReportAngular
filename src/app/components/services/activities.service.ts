import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {

  baseUrl = environment.baseUrl;
  headers = new HttpHeaders({ 'Content-Type':'application/json' });

  constructor(private httpClient: HttpClient) { }

  index(){
    return this.httpClient.get(this.baseUrl + 'activities',  {headers: this.headers});
  }

  pos(activity: Activity){
    return this.httpClient.post<Activity>(this.baseUrl + 'activities', activity, {headers: this.headers});
  }

}
