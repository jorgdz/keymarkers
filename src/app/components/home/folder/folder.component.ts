import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Folder } from '../../../models/folder';
import { Marker } from '../../../models/marker';

import { FolderService } from '../../../services/folder.service';
import { MarkerService } from '../../../services/marker.service';
import { EmitService } from '../../../services/emit/emit.service';
import { PasswordService } from '../../../services/password.service';
import { ScrapeService } from '../../../services/scrape.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
  providers: [FolderService]
})
export class FolderComponent implements OnInit{

	public _id:string;
	public folder:Folder;
  public marker:Marker;
  public markerSelect:Marker;

  public assoc:boolean = false;
  public showPass:boolean = false;


	constructor(private activatedRouter: ActivatedRoute, private folderService:FolderService, private markerService:MarkerService, private toastService: ToastrService, 
    private spinnerService:NgxSpinnerService, private emitService: EmitService, private passwordService:PasswordService, private scrapeService:ScrapeService, 
    private router: Router) {
    
    this.folder = new Folder();
    this.marker = new Marker();
    this.markerSelect = new Marker();
  }

	ngOnInit(): void {
		this.getFolderById();
	}

	getFolderById() {
    this.spinnerService.show();

  	this.activatedRouter.params.subscribe(params => {
    	this._id = params['id'];
      this.folderService.getFolderById(this._id).subscribe(
        res => {
          this.folder = res['data'];

          this.spinnerService.hide();
        },
        err => {
          this.router.navigateByUrl('/keymarker');
          this.spinnerService.hide();
        }
      );
  	})
  }

  delete()
  {
    this.spinnerService.show();

    this.folderService.delete(this._id).subscribe(
      res => {
        this.emitService.emitChange(this._id);
        
        this.router.navigateByUrl('/keymarker/dashboard');

        this.spinnerService.hide();
        
        this.toastService.success(res['message'], 'Hecho !');
      }
    );
  }

  update (form)
  {
    this.spinnerService.show();

    this.folderService.update(form.value, this._id).subscribe(
      res => {
        this.emitService.emitChange(this._id);

        this.spinnerService.hide();

        this.toastService.success(res['message'], 'Hecho !');
      },
      err => {
        this.spinnerService.hide();

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
          else
          {
            this.toastService.error(Errors, err.status);
          }
        }
        else
        {
          console.log(err);
          this.toastService.error(err, err.status);
        }
      }
    );
  }



  /************* MARKERS*************/
  showPassword()
  {
    this.showPass = !this.showPass;
  }

  assocAccount()
  {
    if (this.marker.name == '' || this.marker.name == null || this.marker.name == 'null' || this.marker.name == undefined || this.marker.link == '' || this.marker.link == null || this.marker.link == 'null' || this.marker.link == undefined) {
      this.toastService.error('Por favor ingresar un marcador y un nombre descriptivo para el mismo', 'Ups!');
    }
    else
    {
      this.marker.username = '';
      this.marker.email = '';
      this.marker.pass ='';
      this.assoc = !this.assoc;
    }
  }

  clear()
  {
    this.marker.link = '';
    this.marker.title = '';
    this.marker.description = '';
    this.marker.image = '';
    this.marker.source = '';
    this.marker.url = '';
    this.marker.name = '';
    this.marker.username = '';
    this.marker.email = '';
    this.marker.pass = '';
    this.marker.folder = '';
    this.assoc = false;
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




  // CREATE A NEW MARKER FOR THIS FOLDER
  saveMarker(form)
  {
    if (this.marker.name == '' || this.marker.name == null || this.marker.name == 'null' || this.marker.name == undefined || 
      this.marker.link == '' || this.marker.link == null || this.marker.link == 'null' || this.marker.link == undefined 
      || this.marker.title == '' || this.marker.url == '')
    {      
      this.toastService.error('Por favor ingresar un marcador válido, y un nombre descriptivo para el mismo', 'Ups!');
    }
    else
    {
      this.spinnerService.show();
      this.marker.folder = this._id;
      
      this.markerService.create(this.marker).subscribe(
        res => {
          this.getFolderById();

          this.marker.link = '';
          this.marker.title = '';
          this.marker.description = '';
          this.marker.image = '';
          this.marker.source = '';
          this.marker.url = '';
          this.marker.name = '';
          this.marker.username = '';
          this.marker.email = '';
          this.marker.pass = '';
          this.marker.folder = '';
          this.assoc = false;
         
          this.spinnerService.hide();
          this.toastService.success(res['message'], 'Hecho !!');
        },
        err => {
          this.spinnerService.hide();
          console.log(err);
          this.toastService.error(err.message, err.status);
        }
      );
    }
  }

  selectMarker(marker)
  {
    this.markerSelect = marker;
  }

  deleteMarker()
  {
    this.spinnerService.show();

    this.markerService.delete(this.markerSelect._id).subscribe(
      res => {
        this.getFolderById();
        this.spinnerService.hide();
        this.toastService.success(res['message'], 'Hecho !!');
      }, 
      err => {
        this.spinnerService.hide();
        console.log(err);
        this.toastService.error(err.message, err.status);
      }
    );
  }
}
