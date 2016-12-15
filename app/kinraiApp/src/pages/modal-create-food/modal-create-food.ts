import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ModalController } from 'ionic-angular';

import {ModalNewOptionPage} from '../modal-new-option/modal-new-option';
/*
  Generated class for the ModalCreateFoodPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	templateUrl: 'modal-create-food.html',
  })
  export class ModalCreateFoodPage {
  	food: any;
    curCat: string;
  	categories: Array<any>;
  	selectedCat: string;
  	types: Array<string>;
  	selectedType: string;
  	options: Array<any>;	
  	selectedOptions: Array<any>;
  	constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtlr: ViewController, public modalCtrl: ModalController) {
  		this.categories = this.navParams.get('categories');
  		this.curCat = this.navParams.get('curCat');
  		console.log("curCat: " + this.curCat);
  		this.types = [
  			"ต้ม",
  			"ผัด",
  			"แกง",
  			"ทอด",
  		];
  		this.options = [
  			"ระดับความเผ็ด",
  			"ระดับความหวาน",
  			"ขนาด",
  		]
      this.food = {
        title: "",
        price: 0,
        estTime: 0,
        type:"",
        cat:"",
        options:""
      }
  	}
  	openNewOption(){
  		let modal = this.modalCtrl.create(ModalNewOptionPage);
  		modal.present();
  	}
  	cancel(){
  		this.viewCtlr.dismiss();
  	}
  }
