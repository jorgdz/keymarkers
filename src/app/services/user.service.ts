import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Api } from '../api.backend';
import { User } from '../models/user';

@Injectable()
export class UserService {

	public api:string = Api;

	constructor(private http: HttpClient) { }

  	updateUserAuth (user:User) 
  	{
  		let httpOptions;
  		if (localStorage.getItem('accessToken') != '' && localStorage.getItem('accessToken') != null && localStorage.getItem('accessToken') != undefined &&  localStorage.getItem('accessToken') != 'null') 
  		{
	  		httpOptions = {
		  	  headers: new HttpHeaders({
		  	    'Content-Type':  'application/json',
		  	    'authorization': localStorage.getItem('accessToken')
		  	  })
		  	};
	  	}
  		else
  		{
  			httpOptions = {
		  	  headers: new HttpHeaders({
		  	    'Content-Type':  'application/json'
		  	  })
		  	};
  		}
	  	return this.http.put(this.api + '/api/user', user, httpOptions);	
  	}

  	updatePhoto (file: File)
  	{
  		const formData = new FormData(); 
		formData.append('image', file, file.name); 

		let httpOptions;
  		if (localStorage.getItem('accessToken') != '' && localStorage.getItem('accessToken') != null && localStorage.getItem('accessToken') != undefined &&  localStorage.getItem('accessToken') != 'null') 
  		{
	  		httpOptions = {
		  	  headers: new HttpHeaders({
		  	    'authorization': localStorage.getItem('accessToken')
		  	  })
		  	};
	  	}
  		else
  		{
  			httpOptions = {
		  	  headers: new HttpHeaders({})
		  	};
  		}

		return this.http.post(this.api + '/api/upload-image', formData, httpOptions);
  	}
}