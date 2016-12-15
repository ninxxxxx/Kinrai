import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';

import {ModalAddQueuePage} from '../modal-add-queue/modal-add-queue';
import {ModalCreateFoodPage} from '../modal-create-food/modal-create-food';
/*
  Generated class for the QueueMainPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.ss
  */
  @Component({
  	selector: 'queue-main',
  	templateUrl: 'queue-main.html',
  })

  export class QueueMainPage {

  	isRe:boolean = false;
  	isToggle:boolean = true;
  	countt: number;
  	prevQueue:any;
  	queues:any;
  	
  	totalWaitTime:number = 0;
  	

  	constructor(public navCtrl: NavController, public modalCtrl: ModalController, viewCtrl: ViewController) {
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

  	// ngAfterViewInit(){

  	// 	this.changeWaitTime();
  	// }
  	changeWT(value: number){
  		this.totalWaitTime = value;
  	}


  	showAddQueueModal(){
  		let modal = this.modalCtrl.create(ModalAddQueuePage);
  		modal.present();
  	}

    showCreateFoodModal(){
      let modal = this.modalCtrl.create(ModalCreateFoodPage);
      modal.present();
    }  	


  }

  
