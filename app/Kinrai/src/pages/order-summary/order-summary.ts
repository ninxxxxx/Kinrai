import { Component } from '@angular/core';
import { ToastController, ViewController, NavController, NavParams, ModalController } from 'ionic-angular';


import { OrderService } from '../../providers/order-service';
import { ModalAddOrderComponent } from '../../components/modal-add-order/modal-add-order';
import { SelectTablePage } from '../../pages/select-table/select-table';


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
	tableNumber: any;

	editIndex: number;
	bill: any;
	socket: any;
	constructor(
		public toastCtrl: ToastController,
		private orderService: OrderService,
		public modalCtrl: ModalController,
		public navCtrl: NavController, 
		public navParams: NavParams,
		public viewCtrl: ViewController
		) {
		this.tableNumber = {};
		this.totalWaitTime = 0;
		this.totalPrice = 0;
		
		this.bill = this.navParams.get('bill');
		console.log(this.bill);
		if(this.bill){
			this.tableNumber = this.bill.bill.table_number;
			this.orders = this.bill.bill.orders;
			this.totalPrice = this.bill.bill.total_price;
			this.calWaitTime();
		}
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
			console.log("order ===> ",order);
			if(order != undefined){
				console.log("order: ");		
				console.log(order);
				this.orders.push(order);
				this.calWaitTime();
				this.calTotalPrice();
			}
		});
		modal.present();
	}

	checkTableZone(){
		return (this.tableNumber.zone && this.tableNumber.table) ? this.createBill() : this.toast("Please select customer's table.");
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
		if(this.bill){
			setTimeout(()=>{
				if(this.bill.id != ""){
					this.socket.emit("remove pre-order", this.bill.id);
				}
				this.socket.emit("orders changed", "...");
				this.socket.emit("bills changed", "...");
				this.viewCtrl.dismiss();
			},250);
		}else{
			this.viewCtrl.dismiss();
		}
	}

	updateBill(){
		this.bill.bill.table_number = this.tableNumber;
		this.bill.bill.orders = this.orders
		this.bill.bill.total_price = this.totalPrice;
		this.orderService.updateBill(this.bill.bill).subscribe(
			res =>{
				this.toast("updated");
				console.log(res);
			},
			err =>{
				console.log(err);
			});
		this.viewCtrl.dismiss();
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
			this.totalPrice += (order.price* parseInt(order.amount));
			// order.selected_toppings.map(top =>{ this.totalPrice += (top.price*order.amount)});
		});
		console.log(this.totalPrice);
	}

	editOrder(order){
		this.editIndex = this.orders.indexOf(order);
		// console.log("index: " + this.orders.indexOf(order));
		let modal = this.modalCtrl.create(ModalAddOrderComponent,{order});
		modal.onDidDismiss(order =>{
			console.log("==>");
			console.log(order);
			this.orders[this.editIndex] = order;
			this.calTotalPrice();
			this.calWaitTime();
		});
		modal.present();
	}

	declineRequest(){
		this.socket.emit("remove pre-order", this.bill.id);
		this.viewCtrl.dismiss();
	}

	selectTable(){
		let modal = this.modalCtrl.create(SelectTablePage);
		modal.onDidDismiss((tableNumber) =>{
			this.tableNumber = tableNumber ? tableNumber : this.tableNumber; 
		});
		modal.present();
	}

	test(){
		console.log("test test");
	}

	removeOrder(index){
		this.orders.splice(index, 1);
	}
}
