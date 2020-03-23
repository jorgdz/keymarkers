import { Component, OnInit } from '@angular/core';
import { Folder } from '../../../models/folder';
import { FolderService } from '../../../services/folder.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-addfolder',
  templateUrl: './addfolder.component.html',
  styleUrls: ['./addfolder.component.css'],
  providers: [FolderService]
})
export class AddfolderComponent implements OnInit {

	public folder:Folder;

  	constructor(private folderService:FolderService) { 
  		this.folder = new Folder();
  	}

  	ngOnInit(): void {
  	}

  	save(form)
  	{
  		console.log(this.folder);
  	}
}
