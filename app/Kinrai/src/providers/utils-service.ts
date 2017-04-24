import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';
/*
  Generated class for the Utils provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
  	*/
  @Injectable()
  export class UtilsService {

  	constructor(public toastCtrl: ToastController, public http: Http) {
  		console.log('Hello Utils Provider');
  	}

  	toast(messages,  time){
  		let toast = this.toastCtrl.create({
  			message: messages,
  			duration: (time*1000)
  		});
  		toast.present();
  	}
  	acceptToast(msgs){
  		let toast = this.toastCtrl.create({
  			message: msgs,
  			// duration: (time*1000)
  		});
  		toast.present();	
  	}
  }
