import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { MarkerService } from '../../../services/marker.service';
import { ScrapeService } from '../../../services/scrape.service';
import { PasswordService } from '../../../services/password.service';

import { Marker } from '../../../models/marker';

@Component({
  selector: 'app-edit-marker',
  templateUrl: './edit-marker.component.html',
  styleUrls: ['./edit-marker.component.css']
})
export class EditMarkerComponent implements OnInit {
	
		public _id:string;
  	public marker:Marker;
  	public showPass:boolean = false;

  	constructor(private activatedRouter: ActivatedRoute, private spinnerService:NgxSpinnerService, 
  		private toastService: ToastrService, private router: Router, private markerService: MarkerService, private scrapeService:ScrapeService, private passwordService:PasswordService) 
  	{
  		this.marker = new Marker();
  	}

  	ngOnInit(): void {
  		this.getMarkerById();
  	}

  	getMarkerById() {
	    this.spinnerService.show();

	  	this.activatedRouter.params.subscribe(params => {
	    	this._id = params['id'];
	    	this.markerService.getMarkerById(this._id).subscribe(
	        res => {
	          this.marker = res['data'];

	          this.spinnerService.hide();
	        },
	        err => {
	          this.router.navigateByUrl('/keymarker/dashboard');
	          console.log(err);
	          this.spinnerService.hide();
	        }
	      );
	  	})
	  }

	  showPassword()
	  {
	    this.showPass = !this.showPass;
	  }

	  generatePassword()
	  {
	    this.spinnerService.show();

	    this.passwordService.generatePass().subscribe(
	      res => {
	        this.marker.pass = res['data'];
	        this.spinnerService.hide();
	      },
	      err => {
	        console.log(err);
	        this.spinnerService.hide();
	        this.toastService.error(err.error.error, err.status);
	      }
	    );
	  }  

	  getLinkData()
	  {
	  	if (this.marker.link != '' && this.marker.link != null && this.marker.link != 'null' && this.marker.link != undefined) 
	    {
	      this.spinnerService.show();

	      this.scrapeService.getLinkData(this.marker.link).subscribe(
	        res => {       
	          this.marker.title = res['data']['title'];
	          this.marker.description = res['data']['description'];
	          this.marker.image = res['data']['image'];
	          this.marker.source = res['data']['source'];
	          this.marker.url = res['data']['url'];

	          this.spinnerService.hide();
	        },
	        err => {
	          console.log(err);
	          this.toastService.error(err.error.error, err.status);
	          this.spinnerService.hide();
	        }
	      );    
	    }
	    else
	    {
	      this.marker.title = '';
	      this.marker.description = '';
	      this.marker.image = '';
	      this.marker.source = '';
	      this.marker.url = '';
	    }
	  }

	  updateMarker(form)
	  {
		  if (this.marker.name == '' || this.marker.name == null || this.marker.name == 'null' || this.marker.name == undefined || 
	      this.marker.link == '' || this.marker.link == null || this.marker.link == 'null' || this.marker.link == undefined 
	      || this.marker.url == '')
	    {      
	      this.toastService.error('Por favor ingresar un marcador válido, y un nombre descriptivo para el mismo', 'Ups!');
	    }
	    else
	    {
	    	this.spinnerService.show();
	    	
	    	this.markerService.update(this.marker, this.marker._id).subscribe(
	    		res => {
	    			this.spinnerService.hide();
	    			this.toastService.success(res['message'], 'Hecho !');
	    			
	    			this.router.navigateByUrl('/keymarker/folder/' + res['data']['folder']);
	    		},
	    		err => {
	    			this.spinnerService.hide();
	    			this.toastService.error(err.message, err.status);
	    		}
	    	);
	    }
	  }
}
