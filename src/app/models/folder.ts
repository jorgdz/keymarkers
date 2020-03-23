import { Marker } from './marker';

export class Folder
{
	public _id:string; 
	public name:string; 
	public description:string;
	public user:string;
	public markers:Array<Marker>;

	constructor () {}
}