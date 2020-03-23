import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Api } from '../api.backend';
import { User } from '../models/user';

@Injectable()
export class RegisterService {
	
	public api:string = Api;

	constructor(private http: HttpClient) {
    	
  	}

  	register(user:User) 
  	{
	  	return this.http.post(this.api + '/api/register', user);       
  	}
}