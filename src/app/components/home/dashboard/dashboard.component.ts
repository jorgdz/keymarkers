import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

	public counts:any;

 	constructor(private dashService:DashboardService) {

  	}

  	ngOnInit(): void {
  		this.getCountFoldersAndMarkers();
  	}

  	getCountFoldersAndMarkers()
  	{
  		this.dashService.getCount().subscribe(
  			res => {
  				this.counts = res['data'];
	  		}
  		);
  	}
}
