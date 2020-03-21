import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	public user: User;

	constructor(private router: Router, private toastService:ToastrService) {
		this.user = new User();
	}

  	ngOnInit(): void {
  	}


  	register (form)
  	{
  		console.log(this.user);
  	}
}	
