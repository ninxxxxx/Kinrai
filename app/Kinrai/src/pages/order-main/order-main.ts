import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { ModalAddOrderComponent } from '../../components/modal-add-order/modal-add-order';
import { ModalAddFoodComponent } from '../../components/modal-add-food/modal-add-food';
/*
  Generated class for the OrderMain page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  declare var cordova:any;
  // declare var window:any;

  @Component({
  	selector: 'page-order-main',
  	templateUrl: 'order-main.html'
  })
  export class OrderMainPage {

  	isRe:boolean = false;
  	isToggle:boolean = true;
  	countt: number;
  	prevQueue:any;
  	queues:any;
  	
  	totalWaitTime:number = 0;
  	
  	constructor(
      public navCtrl: NavController, 
      public modalCtrl: ModalController, 
      public viewCtrl: ViewController
      ) {
  		this.countt = 2;
  		this.queues = [
  		{status: "cooking", estTime: 3, waitTime: 0, title:"ไข่เจียวหมูสับ", isToggle:false}, 
  		{status: "cooking", estTime: 12, waitTime: 0, title:"ต้มจืดตำลึง", isToggle:false},
  		{status: "waiting", estTime: 5, waitTime: 0, title:"ปลากระพงทอดเกลือ", isToggle:false}, 
  		{status: "waiting", estTime: 5, waitTime: 0, title:"กระเพราไก่", isToggle:false}, 
  		{status: "waiting", estTime: 5, waitTime: 0, title:"คะน้าหมูกรอบ", isToggle:false}, 
  		{status: "waiting", estTime: 5, waitTime: 0, title:"ยำคอหมูย่าง", isToggle:false}, 
  		{status: "waiting", estTime: 5, waitTime: 0, title:"สันคอลิซาด้อนอบน้ำผึ่ง", isToggle:false}, 
  		{status: "waiting", estTime: 5, waitTime: 0, title:"ยำลิ้นอาบ๊อก", isToggle:false}, 
  		];	 
  	}

  	ionViewDidLoad() {
  		console.log('ionViewDidLoad OrderMainPage');
  	}
  	changeWT(value: number){
  		this.totalWaitTime = value;
  	}
    showAddQueueModal(){
      let modal = this.modalCtrl.create(ModalAddOrderComponent);
      modal.present();
    }

    showCreateFoodModal(){
      let modal = this.modalCtrl.create(ModalAddFoodComponent);
      modal.present();
    }  	
  }
