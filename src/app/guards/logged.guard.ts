import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoggedGuard implements CanActivate {
  
	constructor(private loginService:LoginService, private router:Router, private _location: Location) { }

	canActivate(){
		if (!this.loginService.getUserLoggedIn()) 
		{
			return true;
		}
		else
		{
			this._location.back();
			return false;
		}
	}
  
}
