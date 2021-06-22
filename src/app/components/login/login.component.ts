import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: Login = {
    nit: '',
    password: '',
    device_name: 'Web-SPA'
  }

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  autenticate(){
    if(this.login.nit != '' && this.login.password != '')
    {
      this.loginService.login(this.login).subscribe((data) =>{
        if(data.response_code == 200){
          localStorage.setItem('token', data.data['token']);
          this.loginService.setAuth(true);
          this.router.navigate(['activities']).then( () => false);
        }
        else
          alert(data.message);
      }, (error)=>{
        console.log('An error has ocurred');
      });
    }    
  }

}
