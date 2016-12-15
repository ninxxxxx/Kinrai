import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';

/*
  Generated class for the QueueItemPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'queue-item',
  	templateUrl: 'queue-item.html',
  })
  export class QueueItemPage {
  	@Input() name: string;
  	isToggle:boolean;
  	
  	constructor(public navCtrl: NavController) {
  		this.isToggle = false;
  	}

  	

  }
