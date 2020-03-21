import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Api } from '../api.backend';
import { UserLogin } from '../models/user.login';

@Injectable()
export class LoginService {
  
  public isUserLoggedIn;
  public usserLogged:UserLogin;

  public api:string = Api;

  constructor(private http: HttpClient) {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(user:UserLogin) 
  {
    this.isUserLoggedIn = true;
    this.usserLogged = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserLoggedIn()
  {
    return JSON.parse(localStorage.getItem('user'));
  }

  setToken(token:string)
  {
    localStorage.setItem("accessToken", token);
  }

  getToken() 
  {
    return localStorage.getItem("accessToken");
  }


  /*************************************************/
  logout() 
  {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    console.log('Bye !!!');
  }


  login(user:UserLogin)
  {
    return this.http.post(this.api + '/api/login', {
      email: user.email,
      password: user.pass,
    });     
  }

  getUserAuth(token:string) 
  {
  	const httpOptions = {
  	  headers: new HttpHeaders({
  	    'Content-Type':  'application/json',
  	    'authorization': token
  	  })
  	};
    
	  httpOptions.headers = httpOptions.headers.set('authorization', token);

  	return this.http.get(this.api + '/api/auth', httpOptions);     
  }
}