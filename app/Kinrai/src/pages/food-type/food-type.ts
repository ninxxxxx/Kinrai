import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController } from 'ionic-angular';

import { ModalAddFoodComponent } from '../../components/modal-add-food/modal-add-food';

/*
  Generated class for the FoodType page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-food-type',
  templateUrl: 'food-type.html'
})
export class FoodTypePage {

    	category: string;
  	curCat: any;
  	allCat: Array<any>;
  	foodByCat: Array<any>;
  	constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public actSheet: ActionSheetController) {
  		this.category = navParams.get('curCat');
  		this.allCat = navParams.get('allCat');
  		console.log("category: " + this.category);

  		this.foodByCat = [
  		{
  			title: "Main Dish",
  			types: [
  			{title: "ต้ม", foods: ["แกงจืด", "ต้มโคล้ง"]},
  			{title: "ผัด", foods: ["ผัดฝัก", "ฝักผัด"]},
  			],
  		},
  		{
  			title: "Snack",
  			types: [
  			{title: "ทอด", foods: ["กล้วยทอด"]},
  			{title: "บิงซู", foods: ["Strawberry", "Oreo", "Chocolate"]},
  			],
  		},
  		{
  			title: "Drink",
  			types: [
  			{title: "กาแฟ", foods: ["ลาเต้", "มอคค่า"]},
  			],
  		},

  		];
  		this.curCat = this.foodByCat.find(x => x.title == this.category); 
  		// console.log(this.foodByCat.find(x => x.cat == this.category));
  	}
  	
  	ionViewDidLoad() {
  		console.log('Hello FoodByTypePage Page');
  	}

  	openModalNewFood(){
  		let modal = this.modalCtrl.create(ModalAddFoodComponent, {categories: this.allCat, curCat: this.category});
  		modal.present();
  		modal.onDidDismiss(food =>{
  			console.log("Food: " + food);
  			// this.events.push(event);
  		});
  	}

  	// openActSheetCat(){
  	// 	let actionSheet = this.actSheet.create({
  	// 		tite: 

  	// 	});
  	// }


}
