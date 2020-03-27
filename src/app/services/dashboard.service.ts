import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Api } from '../api.backend';

@Injectable()
export class DashboardService {

	public api:string = Api;

	constructor (private http: HttpClient) {}

	getCount ()
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

  		return this.http.get(this.api + '/api/mycountfolders', httpOptions);
	}
}