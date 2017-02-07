import { Component } from '@angular/core';
import { ToastController, ViewController, NavController, NavParams, ModalController } from 'ionic-angular';


import { OrderService } from '../../providers/order-service';
import { ModalAddOrderComponent } from '../../components/modal-add-order/modal-add-order';

declare var io;

@Component({
	selector: 'page-order-summary',
	templateUrl: 'order-summary.html',
	providers: [OrderService]
})

export class OrderSummaryPage {

	orders = [];
	totalWaitTime: number;
	totalPrice: number;
	tableNumber: string;

	socket: any;
	constructor(
		public toastCtrl: ToastController,
		private orderService: OrderService,
		public modalCtrl: ModalController,
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl: ViewController
		) {
		this.tableNumber = "";
		this.totalWaitTime = 0;
		this.totalPrice = 0;
		this.openNewOrder();
		// let firstOrder = this.navParams.get('order');
		// this.orders.push(firstOrder);
		this.socket = io(this.orderService.server);

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad OrderSummaryPage');
	}

	cancel(){
		this.viewCtrl.dismiss();
	}

	openNewOrder(){
		let modal = this.modalCtrl.create(ModalAddOrderComponent);
		modal.onDidDismiss(order =>{
			if(order){
				console.log("order: ");		
				console.log(order);
				this.orders.push(order);
				this.calWaitTime();
				this.calTotalPrice();
			}
		});
		modal.present();
	}

	createBill(){
		console.log(this.orders);
		let bill = {
			table_number: this.tableNumber,
			orders: this.orders,
			total_price: this.totalPrice
		}
		this.orderService.createBill(bill).subscribe(
			res =>{
				this.toast(res);
			},
			err =>{
				this.toast(err);
			}
			);
		setTimeout(()=>{
			this.socket.emit("orders changed", "...");
			this.viewCtrl.dismiss();
		},1000);
	}

	toast(messages){
		let toast = this.toastCtrl.create({
			message: messages,

			duration: 500
		});
		toast.present();
	}

	calWaitTime(){
		this.orders.map(order =>{
			this.totalWaitTime += order.food.estimate_time;
		});
	}
	calTotalPrice(){
		this.totalPrice = 0;
		this.orders.map(order =>{
			this.totalPrice += (order.price*order.amount);
		});
	}

	editOrder(order){
		let modal = this.modalCtrl.create(ModalAddOrderComponent,{order});
		modal.onDidDismiss(order =>{
			console.log("==>");
			console.log(order);
		});
		modal.present();
	}
}
