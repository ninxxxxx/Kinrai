import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { FoodTypePage } from '../food-type/food-type';
/*
  Generated class for the FoodCategories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-food-categories',
  templateUrl: 'food-categories.html'
})
export class FoodCategoriesPage {

    	categories: Array<any>;
  	constructor(public navCtrl: NavController, public alertCtlr: AlertController) {
  		this.categories = [
  			"Main Dish",
  			"Snack",
  			"Drink"
  		]
  	}

  	ionViewDidLoad() {
  		console.log('Hello FoodsPage Page');
  	}

    openFoodByType(category){
      this.navCtrl.push(FoodTypePage, {curCat: category, allCat: this.categories});
    }


    openPrompt(){
      let alert = this.alertCtlr.create({
        title: "New Category",
        inputs: [
          {name: 'title', placeholder: 'Title'}
        ],
        buttons: [
          {
            text: 'cancel',
            role: 'cancel'
          },
          {
            text: 'save',
            handler: data => {
              if(data.title)
                this.categories.push(data.title);
            }
          }
        ]
      });
      alert.present();
    }

}
