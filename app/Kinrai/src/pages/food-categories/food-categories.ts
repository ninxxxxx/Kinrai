import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, ModalController, LoadingController, ToastController, Refresher } from 'ionic-angular';

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
      public loadCtrl: LoadingController,
      public toastCtrl: ToastController,
      public navCtrl: NavController, 
      public alertCtrl: AlertController,
      public modalCtrl: ModalController
      ) {



      // this.categories = [
      // 	"Main Dish",
      // 	"Snack",
      // 	"Drink"
      // ]
    }

    ngOnInit(){
      this.getCategories();
      // console.log(this.categories);
    }


    ionViewDidLoad() {
      // console.log(this.getCategories());
      // this.categories = this.getCategories();
      // console.log(this.categories);
      // console.log('Hello FoodsPage Page');
      // this.categories = this.getCategories();
      // this.openType("Main Dish");
    }

    getCategories(){


      let loading = this.loadCtrl.create({
        content: "Please wait a minute..."
      });

      loading.present().then(()=>{
        this.orderService.getCategories().subscribe(
          res =>{
            // console.log(res);
            this.categories = res;
            // this.toast("we got all Category"); 
            // return res;
          },
          err =>{
            console.log(err);
            this.toast(err);
          }
          );
        loading.dismiss();
      });
      
    }

    openType(categoryId){
      // let modal = this.modalCtrl.create(FoodTypePage, {currentCat: category, categories: this.categories});
      // modal.present();
      this.navCtrl.push(FoodTypePage, {categoryId: categoryId});
    }


    openPrompt(){
      let alert = this.alertCtrl.create({
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
            this.orderService.newCategory(data.title).subscribe(
              res =>{
                console.log(res);
                this.categories = res;
                this.toast("New Category created");
              },
              err =>{
                this.toast(err);
              }
              );
            // if(data.title)
            //   this.categories.push(data.title);
          }
        }
        ]
      });
      alert.present();
    }

    toast(messages){
      let toast = this.toastCtrl.create({
        message: messages,
        duration: 3000
      });
      toast.present();
    }

    presentLoading(){
      let loading = this.loadCtrl.create({
        content: "Please wait a minute"
      });
      loading.present();

      setTimeout(()=>{
        loading.dismiss();
      }, 2000);

    }

    doRefresh(refresher){
      this.getCategories()

      // refresher.complete();
      // console.log(refresher);

      setTimeout(()=>{
        refresher.complete();
      }, 0);

    }
  }
