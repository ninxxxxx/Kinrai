import { Component } from '@angular/core';
import { ViewController, ModalController, NavController, NavParams } from 'ionic-angular';

import { OrderSummaryPage } from '../../pages/order-summary/order-summary';

import { OrderService } from '../../providers/order-service';
/*
  Generated class for the Preoders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  declare var io;

  @Component({
  	selector: 'page-preoders',
  	templateUrl: 'preoders.html',
  	providers: [OrderService]
  })
  export class PreodersPage {

  	bills: any;

  	socket: any;
  	constructor(
      public viewCtrl: ViewController,
      public modalCtrl: ModalController,
      private orderService: OrderService, 
      public navCtrl: NavController, 
      public navParams: NavParams
      ) 
  	{
  		this.bills = [];


  		this.socket = io(this.orderService.server);
  		this.socket.on("pre-order is coming", (bills)=>{
  			// let bills = JSON.parse(bills);
  			this.bills = bills;
  		});
  		this.socket.emit("get pre-orders","give me");

  	}

  	ionViewDidLoad() {
  		console.log('ionViewDidLoad PreodersPage');
  	}

  	openSummaryOrder(bill){

      console.log("from Pre-Order", bill);
      let modal = this.modalCtrl.create(OrderSummaryPage, {bill: bill});
      modal.present();
    }

    removePre(bill){
      this.socket.emit("remove pre-order", bill);
    }

    cancel(){
      this.viewCtrl.dismiss();
    }
  }
