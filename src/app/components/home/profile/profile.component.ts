import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../../models/user';

import { UserService } from '../../../services/user.service';
import { LoginService } from '../../../services/login.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {

	public user:User;
	public fileUpload: Array<File>;

  	constructor(private loginService: LoginService, private userService:UserService, private router: Router, private toastService:ToastrService, private spinnerService:NgxSpinnerService) { 
  		this.user = new User();
  	}

  	ngOnInit(): void {
  		this.spinnerService.show();
  		console.log('Profile');

  		let token = this.loginService.getToken();
  		if (token != '' && token != null) 
  		{
  			this.loginService.getUserAuth(token).subscribe(
  				res => {
    				this.user = res['data'];
    				this.spinnerService.hide();
    			},
				err => {
			  		console.error(err);
			  		this.spinnerService.hide();
				}
  			);
  		}
  	}

  	updateProfile (form)
  	{
  		if (this.user.password != this.user.repeatPassword) 
  		{
  			this.toastService.error('Las contraseñas deben ser iguales !!', 'Error');
  		}
  		else
  		{
  			this.spinnerService.show();

	  		this.userService.updateUserAuth(this.user).subscribe(
	  			res => {
	  				if ((this.user.name + ' ' + this.user.lastname) != localStorage.getItem('name')) {
	  					localStorage.removeItem('name');
	  					let name = this.user.name + ' ' + this.user.lastname;
	  					localStorage.setItem('name', name);
							
						document.querySelector('#nameUser').textContent = name;
					}

					this.user.password = '';
					this.user.repeatPassword = '';
					this.toastService.success(res['message'], res['status']);
					
					this.spinnerService.hide();
	  			},
	  			err => {
	  				if (err.error != undefined && err.error.error != undefined) 
	  				{
		  				let Errors = err.error.error;
		  				if (Array.isArray(Errors)) 
		  				{
		  					for (let i = 0; i < Errors.length; i++) 
	          				{
	          					this.toastService.error(Errors[i], err.status); 
	          				}	
		  				}
		  				else {
				  			this.toastService.error(Errors, err.status);
		  				}
	  				}
	  				else {
	  					console.log(err);
	  				}

	  				this.spinnerService.hide();
	  			}
	  		);
  		}
  	}

  	loadImage(file: any)
  	{
  		this.fileUpload = <Array<File>> file.target.files;
  	}


  	uploadImage ()
  	{
  		if (this.fileUpload == undefined) 
  		{
  			this.toastService.error('Por favor selecciona una imagen', 'Ups!');
  		}
  		else
  		{
  			this.spinnerService.show();

	  		this.userService.updatePhoto(this.fileUpload[0]).subscribe(
	  			res => {
	  				this.user.image = res['data']['image'];

	  				document.querySelector('#imgUser').setAttribute('src', res['data']['image']);
	  				localStorage.removeItem('photo');
	  				localStorage.setItem('photo', res['data']['image']);
	  				
	  				this.fileUpload = [];

	  				this.spinnerService.hide();
	  				this.toastService.success(res['message'], 'Hecho!');
	  			},
	  			err => {
	  				this.fileUpload = [];

	  				this.toastService.error(err.message, err.status);
	  				this.spinnerService.hide();
	  			}
	  		);
  		}
  	}
}
