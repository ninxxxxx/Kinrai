import { Component } from '@angular/core';
import { NavParams, NavController, ViewController, ToastController, ModalController, LoadingController } from 'ionic-angular';

import { OrderSummaryPage } from '../../pages/order-summary/order-summary';

import { ChooseFoodPage } from '../../pages/choose-food/choose-food';
import { OrderService } from '../../providers/order-service';
/*
  Generated class for the ModalAddOrder component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
    */
  @Component({
    selector: 'modal-add-order',
    templateUrl: 'modal-add-order.html',
    providers: [OrderService]
  })
  export class ModalAddOrderComponent {

    categories: Array<any>;
    food: any;
    order: any;
    toppings = [];
    amount: number;
    total: number;
    
    isToggle: boolean;

    constructor(
      public navParams: NavParams,
      public loadingCtrl: LoadingController, 
      public modalCtrl: ModalController, 
      public toastCtrl: ToastController, 
      private orderService: OrderService, 
      public navCtrl: NavController, 
      public viewCtrl: ViewController
      ) 
    {
      this.isToggle = true;
      let o = this.navParams.get("order");
      if(o){
        this.amount = o.amount;
        this.total = o.price;
        // this.isToggle = true;
        this.food = o.food;
        this.toppings = o.selected_toppings;
      }else {
        console.log("no order");
        this.amount = 1;
        this.total = 0;
        // this.isToggle = false;
        this.food = {title:"", type: {title: ""}, category: {title: ""}, toppings: [], price: 0};
        this.order = {food:{}, selected_toppings: [], price: 0, togo:false};
        this.chooseFood();
      }
      // this.amount = 1;
      // this.total = 0;
      // this.isToggle = false;
      // this.food = {title:"", type: {title: ""}, category: {title: ""}, toppings: [], price: 0};
      // this.order = {food:{}, selected_toppings: [], price: 0,}

      this.getFullCats();
    }

    cancel(){
      this.viewCtrl.dismiss();
      this.viewCtrl.dismiss();
    }

    sumPrice(){
      this.total += this.food.price;
      this.toppings.map(top => {this.total += top.price;});
    }

    getFullCats(){
      this.orderService.getFullCategories().subscribe(
        categories =>{
          if(categories)
            this.categories = categories;
        },
        err =>{
          this.toast(err);
        }
        )
    }

    toast(messages){
      let toast = this.toastCtrl.create({
        message: messages,
        duration: 3000
      });
      toast.present();
    }

    getFood(foodId){

      this.orderService.getFoodById(foodId).subscribe(
        res => {
          // console.log("res" + res);
          this.food = res;
          this.total += this.food.price;

        },
        err => {
          this.toast(err);
        }
        );

    }

    chooseFood(){
      this.total = 0;
      this.toppings = [];
      let modal = this.modalCtrl.create(ChooseFoodPage);
      modal.onDidDismiss(foodId =>{
        // console.log(foodId);
        if(foodId)
          this.getFood(foodId);
        else console.log("no food is back");
      });
      modal.present();
    }

    addInTo(topping, top){

      console.log("addInto");
      let chosenTopping = {title: topping.title, optionTitle: top.title, price: top.price};
      console.log(chosenTopping);

      let chosenIndex = this.toppings.map(top => { return JSON.stringify(top)}).indexOf(JSON.stringify(chosenTopping));//is in list?
      let currentchosenIndex = this.toppings.map(top => { return top.title}).indexOf(chosenTopping.title);//same title?

      if(chosenIndex == -1){//if not in list yet  
        if(currentchosenIndex > -1){//have same topping title in list
          this.total -= this.toppings[currentchosenIndex].price;
          this.toppings.splice(currentchosenIndex, 1);
        }
        this.total += chosenTopping.price;
        this.toppings.push(chosenTopping);
      }
      else if(chosenIndex > -1){//if already in list
        this.total -= chosenTopping.price;
        this.toppings.splice(chosenIndex, 1);
      }

      // this.total += this.food.price;
    }

    toggleToppings(){
      this.isToggle = !this.isToggle;
    }

    gotoOrderSummary(){
      let order = {
        food: this.food,
        selected_toppings: this.toppings,
        price: this.total,
        amount: this.amount,
        togo: this.order.togo
      }
      // let modal = this.modalCtrl.create(OrderSummaryPage, {order});
      // modal.present();
      this.viewCtrl.dismiss(order);
    }
  }
