import { Component, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  	selector: 'app-root',
  	templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{

	constructor(private spinnerService: NgxSpinnerService) { }

	ngOnInit ()
	{
		this.spinner();
	}

	spinner()
	{
		this.spinnerService.show();
		setTimeout(() => {
			this.spinnerService.hide();
		}, 1000);
	}
}
