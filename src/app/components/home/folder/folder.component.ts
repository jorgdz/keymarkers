import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { Folder } from '../../../models/folder';
import { Marker } from '../../../models/marker';

import { FolderService } from '../../../services/folder.service';
import { EmitService } from '../../../services/emit/emit.service';
import { PasswordService } from '../../../services/password.service';

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

  public assoc:boolean = false;
  public showPass:boolean = false;

	constructor(private activatedRouter: ActivatedRoute, private folderService:FolderService, private toastService: ToastrService, 
    private spinnerService:NgxSpinnerService, private emitService: EmitService, private passwordService:PasswordService, private router: Router) {
    
    this.folder = new Folder();
    this.marker = new Marker();
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
        
        this.router.navigateByUrl('/keymarker');

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


  // Markers
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
    this.marker.name = '';
    this.marker.link = '';
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


  // CREATE A NEW MARKER FOR THIS FOLDER
  saveMarker(form)
  {
    if (this.marker.name == '' || this.marker.name == null || this.marker.name == 'null' || this.marker.name == undefined || this.marker.link == '' || this.marker.link == null || this.marker.link == 'null' || this.marker.link == undefined) {
      this.toastService.error('Por favor ingresar un marcador y un nombre descriptivo para el mismo', 'Ups!');
    }
    else
    {

      console.log(form.value);

      this.marker.name = '';
      this.marker.link = '';
      this.marker.username = '';
      this.marker.email = '';
      this.marker.pass = '';
      this.marker.folder = '';
      this.assoc = false;

    }
  }
}
