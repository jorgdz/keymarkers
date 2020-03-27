import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Api } from '../api.backend';

@Injectable()
export class ScrapeService {

	public api:string = Api;

	constructor (private http: HttpClient) {}

	getLinkData (link:string)
	{
		return this.http.post(this.api + '/api/scrape', {
			url: link
		}); 
	}
}