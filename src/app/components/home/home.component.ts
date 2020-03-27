import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/user';
import { Folder } from '../../models/folder';

import { LoginService } from '../../services/login.service';
import { FolderService } from '../../services/folder.service';
import { EmitService } from '../../services/emit/emit.service';

import { NgxSpinnerService } from 'ngx-spinner';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FolderService]
})
export class HomeComponent implements OnInit {

  	public user:User;
    public fecha:Date;
    public folders: Array<Folder>;

  	constructor(private loginService: LoginService, private folderService: FolderService, private emitService:EmitService, private spinnerService: NgxSpinnerService, private router: Router) 
  	{ 
  		this.user = new User();
      this.fecha = new Date();

      emitService.changeEmitted$.subscribe(
        res => {
          this.getFolders();
        }
      );
  	}
  

  	public userLogged:User = this.loginService.getUserLoggedIn();
  	public token = this.loginService.getToken();


  	ngOnInit(): void {
  		console.log('Home');
   
  		if ((this.token != '' && this.token != null && this.token != 'null' && this.token != undefined) && this.userLogged != null) 
  		{
  			this.loginService.getUserAuth(this.token).subscribe(
  				res => {
    				this.user = res['data'];

            // VERFICO QUE NO ESTE ALMACENADO EL NOMBRE Y LA FOTO DEL USUARIO
            let name = this.user.name + ' ' + this.user.lastname;
        		if ((localStorage.getItem('name') == '' || localStorage.getItem('name') == null) && (localStorage.getItem('photo') == '' || localStorage.getItem('photo') == null)) 
        		{
              localStorage.setItem('name', name);
        			localStorage.setItem('photo', this.user.image);
        		}
            else
            {
              if (localStorage.getItem('name') != name && localStorage.getItem('name') != '' && localStorage.getItem('name') != null) 
              {
                localStorage.removeItem('name');
                localStorage.setItem('name', name);
              }

              if (localStorage.getItem('photo') != this.user.image && localStorage.getItem('photo') != '' && localStorage.getItem('photo') != null) 
              {
                localStorage.removeItem('photo');
                localStorage.setItem('photo', this.user.image);
              }
            }
    			},
				  err => {
					  console.error(err);
				  }
  			);
         
        // GET FOLDERS
        this.getFolders(); 
       // this.router.navigateByUrl('/keymarker/dashboard');
      }
      else
      {
        this.loginService.logout();
      }
  	}


    getFolders ()
    {
      this.spinnerService.show();
      
      this.folderService.getFolders().subscribe(
        res => {
          
          this.folders = res['data'];
          this.spinnerService.hide();

        },
        err => {
          console.log(err);
          this.spinnerService.hide();
        }
      );
    }

    toggle ()
    {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $('.sidebar .collapse').collapse('hide');
      };
    }

  	logout() 
  	{
 		  this.loginService.logout();
      this.router.navigateByUrl('/login');
 	  }

}
