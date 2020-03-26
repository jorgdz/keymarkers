import { Component, OnInit } from '@angular/core';
import { Folder } from '../../../models/folder';
import { FolderService } from '../../../services/folder.service';
import { EmitService } from '../../../services/emit/emit.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addfolder',
  templateUrl: './addfolder.component.html',
  styleUrls: ['./addfolder.component.css'],
  providers: [FolderService]
})
export class AddfolderComponent implements OnInit {

	public folder:Folder;

  constructor(private folderService:FolderService, private toastService:ToastrService, private emitService: EmitService, private router:Router) 
  { 
    this.folder = new Folder();
  }

  ngOnInit(): void {
  }

  save(form)
  {
    this.folderService.create(this.folder).subscribe(
      res => {
        this.toastService.success(res['message'], 'Hecho!');

        this.folder.name = '';
        this.folder.description = '';

        this.emitService.emitChange(res['data']);

        this.router.navigateByUrl('/keymarker/folder/' + res['data']['_id']);
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
          else
          {
            this.toastService.error(Errors, err.status);
          }
        }
        else
        {
          console.log(err);
        }
      }
    );
	}
}
