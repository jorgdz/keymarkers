import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../../models/user.login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  	public user: UserLogin;

  	constructor() { 
  		this.user = new UserLogin('', '');
  	}

	ngOnInit(): void {
	
	}

  	login(form)
  	{
  		console.log(this.user);
	}

	validateEmail()
	{
		if (this.user.email.trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) 
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	validatePass()
	{
		if (this.user.pass == null || this.user.pass == '') 
		{
			return false;
		}
		else
		{
			return true;
		}
	}
}
