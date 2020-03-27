import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../models/user.login';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  	public userLogin: UserLogin;
  	public user: User;

  	public lastLogin:any = {};

  	constructor(private loginService: LoginService, private router: Router, private toastService:ToastrService, private spinnerService: NgxSpinnerService) 
  	{ 
  		this.userLogin = new UserLogin();
  		this.user = new User();
  	}

	ngOnInit(): void {
		if ((localStorage.getItem('name') != '' && localStorage.getItem('name') != null) && (localStorage.getItem('photo') != '' && localStorage.getItem('photo') != null)) {
			this.lastLogin = {
				name: localStorage.getItem('name'),
				photo: localStorage.getItem('photo')
			}
		}
	}

  	login(form)
  	{
  		this.spinnerService.show();

  		this.loginService.login(this.userLogin).subscribe(
			res => {
				localStorage.removeItem('name');
				localStorage.removeItem('photo');
				this.loginService.setUserLoggedIn(res['data']['email']);
				this.loginService.setToken(res['accessToken']);

				this.spinnerService.hide();
				this.toastService.success('Bienvenido ' + res['data']['email'], 'Ok');
			},
		  	error => {	
		  		this.spinnerService.hide();
	  			this.toastService.error((error.error.message != undefined && error.error.message != null && error.error.message != '') ? error.error.message : 'Ha ocurrido un error inesperado', error.status);
		  	},
		  	() => this.navigate()
		);
	}

 	navigate() {    
    	this.router.navigateByUrl('/keymarker/dashboard');
  	}
}
