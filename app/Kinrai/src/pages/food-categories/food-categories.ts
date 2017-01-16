import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { OrderService } from '../../providers/order-service';
import { FoodTypePage } from '../food-type/food-type';
/*
  Generated class for the FoodCategories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-food-categories',
    templateUrl: 'food-categories.html',
    providers: [OrderService]
  })
  export class FoodCategoriesPage {

    categories: any;
    constructor(
      private orderService: OrderService,
      public navCtrl: NavController, 
      public alertCtlr: AlertController,
      ) {
      // this.getCategories();

      // this.categories = [
      // 	"Main Dish",
      // 	"Snack",
      // 	"Drink"
      // ]
    }

    ngOnInit(){
      this.getCategories();
    }


    ionViewDidLoad() {
      // console.log(this.getCategories());
      // this.categories = this.getCategories();
      // console.log(this.categories);
      // console.log('Hello FoodsPage Page');
      // this.categories = this.getCategories();
      // this.openFoodByType("Main Dish");
    }

    getCategories(){
      this.orderService.getCategories().subscribe(
        res =>{
          // console.log(res);
          this.categories = res; 
          // return res;
        },
        err =>{
          console.log(err);
        }
        );
    }

    openFoodByType(category){
      this.navCtrl.push(FoodTypePage, {category: category});
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
