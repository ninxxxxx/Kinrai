import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ModalController } from 'ionic-angular';

import { ModalAddOptionComponent } from '../modal-add-option/modal-add-option';
/*
  Generated class for the ModalAddFood component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'modal-add-food',
  templateUrl: 'modal-add-food.html'
})
export class ModalAddFoodComponent {

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
      let modal = this.modalCtrl.create(ModalAddOptionComponent);
      modal.present();
    }
    cancel(){
      this.viewCtlr.dismiss();
    }

}
