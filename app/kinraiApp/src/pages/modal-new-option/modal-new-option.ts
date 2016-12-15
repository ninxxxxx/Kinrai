import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

/*
  Generated class for the ModalNewOption page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-modal-new-option',
  	templateUrl: 'modal-new-option.html'
  })
  export class ModalNewOptionPage {
  	title: string;
  	option: string;
  	options: Array<string> = [];
  	constructor(public navCtrl: NavController, public viewCtrl: ViewController) {

  	}

  	ionViewDidLoad() {
  		console.log('Hello ModalNewOptionPage Page');
  	}
  	addOption(option){
  		console
  		this.options.push(option);
  		this.option = "";
  	}
  	cancel(){
  		this.viewCtrl.dismiss();
  	}
  }
