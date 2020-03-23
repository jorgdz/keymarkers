import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.css']
})
export class Error404Component implements OnInit {

	public message:string = 'Lo sentimos, pero no hemos encontrado este recurso.';
  	constructor() { }

  	ngOnInit(): void {
  	}

}
