import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../models/login';
import { ResponseLogin } from '../models/responseLogin';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;

  auth: boolean = false;

  constructor(private httpClient: HttpClient) { }

  login(login: Login){
    const headers = new HttpHeaders({ 'Content-Type':'application/json' });
    return this.httpClient.post<ResponseLogin>(this.baseUrl + 'login', login, {headers: headers});
  }

  setAuth(auth: boolean){
    this.auth = auth;
  }

  getAut(){
    return this.auth
  }

}
