import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Report } from '../models/report';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  baseUrl = environment.baseUrl;
  headers = new HttpHeaders({ 'Content-Type':'application/json' });

  constructor(private httpClient: HttpClient) { }

  getReportsForActivity(id: number){
    return this.httpClient.get(this.baseUrl+'reportsactivity/'+id, {headers: this.headers});
  }

  post(report: Report){
    return this.httpClient.post<Report>(this.baseUrl+'reports', report, {headers: this.headers});
  }

}
