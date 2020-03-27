import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Api } from '../api.backend';
import { Marker } from '../models/marker';

@Injectable()
export class MarkerService {

	public api:string = Api;

	constructor (private http: HttpClient) {}

	create (marker: Marker)
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

  		return this.http.post(this.api + '/api/marker', marker, httpOptions); 
	}

	delete (id:string)
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

  		return this.http.delete(this.api + '/api/marker/'+ id, httpOptions); 
	}
}