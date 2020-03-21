import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserLogin } from '../../models/user.login';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  	public user:User;

  	constructor(private loginService: LoginService, private router: Router, private toastService: ToastrService) 
  	{ 
  		this.user = new User();
  	}
  
  	public userLogged:User = this.loginService.getUserLoggedIn();

  	ngOnInit(): void {
  		console.log('Home');

  		let token = this.loginService.getToken();
  		if (token != '' && token != null && this.userLogged != null) 
  		{
  			this.loginService.getUserAuth(token).subscribe(
  				res => {
    				this.user = res['data'];
            		if ((localStorage.getItem('name') == '' || localStorage.getItem('name') == null) && (localStorage.getItem('photo') == '' || localStorage.getItem('photo') == null)) 
            		{
            			localStorage.setItem('name', this.user.name + ' ' + this.user.lastname);
            			localStorage.setItem('photo', this.user.image);
            		}
    			},
				err => {
					console.error(err);
				}
  			);
  		}
  	}


  	logout() 
  	{
 		this.loginService.logout();
 		this.router.navigateByUrl('/login');
 	}

}
