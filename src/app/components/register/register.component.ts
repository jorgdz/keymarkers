import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';

import { RegisterService } from '../../services/register.service';
import { LoginService } from '../../services/login.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})
export class RegisterComponent implements OnInit {

	public user: User;

	constructor(private router: Router, private toastService:ToastrService, private spinnerService: NgxSpinnerService, private registerService:RegisterService, private loginService:LoginService) {
		this.user = new User();
	}

	ngOnInit(): void {
	}


	register (form)
	{
    this.spinnerService.show();

    this.registerService.register(this.user).subscribe(
      res => {
        localStorage.removeItem('name');
        localStorage.removeItem('photo');
        this.loginService.setUserLoggedIn(res['data']['email']);
        this.loginService.setToken(res['data']['accessToken']);

        this.spinnerService.hide();
        this.toastService.info('Hola ' + res['data']['name'] +' '+ res['data']['lastname'] + ' disfruta de nuestra plataforma y organiza tus sitios preferidos', 'Ok');
      },
      error => {
        this.spinnerService.hide();
        
        if (error['error']['error']) {
          let arrayErrors = error['error']['error'];
          console.log(error);
          for (let i = 0; i < arrayErrors.length; i++) 
          {
            this.toastService.error(arrayErrors[i], error.status); 
          }
        }
        else
        {
          this.toastService.error(error, error.status);
        }
      },

      () => this.navigate()
    );
	}

  navigate() {    
    this.router.navigateByUrl('/keymarker/dashboard');
  }
}	
