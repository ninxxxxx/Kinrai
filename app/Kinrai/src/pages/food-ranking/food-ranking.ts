import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FoodRanking page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-food-ranking',
 	templateUrl: 'food-ranking.html',
 })
 export class FoodRanking {

 	public foodRank: Array<any>;
 	constructor(public navCtrl: NavController, public navParams: NavParams) {
 		this.foodRank = this.navParams.get("foodRank");
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad FoodRanking');
 	}
 	
 }
