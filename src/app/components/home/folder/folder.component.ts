import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FolderService } from '../../../services/folder.service';
import { ToastrService } from 'ngx-toastr';
import { Folder } from '../../../models/folder';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.css'],
  providers: [FolderService]
})
export class FolderComponent implements OnInit {

	public _id:string;
	public folder:Folder;

  	constructor(private activatedRouter: ActivatedRoute, private folderService:FolderService, private toastService: ToastrService, private router: Router) { }

  	ngOnInit(): void {
  		this.getId();
  		this.getFolderById();
  		this.folder = new Folder();
  	}

  	getId() {
    	this.activatedRouter.params.subscribe(params => {
      		this._id = params['id'];
    	})
  	}

  	getFolderById()
  	{
  		this.folderService.getFolderById(this._id).subscribe(
  			res => {
  				this.folder = res['data'];
  				
  				if (this.folder == undefined || this.folder == null) {
  					this.router.navigateByUrl('/keymarker/error');
  				}
  			},
  			err => {
  				this.router.navigateByUrl('/keymarker');
  			}
  		);
  	}
}
