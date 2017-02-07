import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';


import { ModalPaymentComponent } from '../../components/modal-payment/modal-payment';
import { OrderService } from '../../providers/order-service';
/*
  Generated class for the Bill page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */

  @Component({
  	selector: 'page-bill',
  	templateUrl: 'bill.html',
  	providers:[OrderService]
  })
  export class BillPage {

  	currentView: string;
  	bills: any;
  	tableNumbers: any;
  	constructor(public modalCtrl: ModalController, private orderService: OrderService, public navCtrl: NavController, public navParams: NavParams) {
  		this.currentView = "table";
  		this.bills = [];
  		this.tableNumbers = [];
  		this.getTableNumbers();
  	}

  	ionViewDidLoad() {
  		console.log('ionViewDidLoad BillPage');
  	}

  	getTableNumbers(){
  		this.orderService.getTableNumbers().subscribe(
  			bills =>{
  				this.bills = bills;

  				let row = Math.floor(bills.length/3) + 1;
  				// let i = 0;

  				this.tableNumbers = [];
  				for(let i = 0; i < row; i++){
  					let sub = [];
  					for(let j = 0; j < 3; j++){
  						if(this.bills[j + (i * 3)])
  							sub.push(this.bills[j + (i * 3)]);
  					}
  					this.tableNumbers.push(sub);
  				}
  				console.log(this.tableNumbers);
  			},
  			err =>{
  				console.log(err);
  			}
  			)
  	}

  	openPaymentModal(tableNumber){
  		let modal = this.modalCtrl.create(ModalPaymentComponent, {tableNumber: tableNumber});
  		modal.present();
  	}
  }
