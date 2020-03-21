import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private loginService: LoginService, private router:Router) { }
  
  canActivate() {
  	if (this.loginService.getUserLoggedIn()) 
  	{
  		return true;	
  	}
  	else
  	{
  		this.router.navigate(['/login']);
  		return false;
  	}
  }
  
}
