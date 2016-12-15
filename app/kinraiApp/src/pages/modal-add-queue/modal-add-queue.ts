import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the ModalAddQueuePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'modal-add-queue',
  	templateUrl: 'modal-add-queue.html',
  })
  export class ModalAddQueuePage {
  	// q = {};
  	constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  	}

  	cancel(){
  		this.viewCtrl.dismiss();
  	}

  	// save(){
  	// 	console.log(this.q);
  	// }

  }
