import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { OrderService } from '../../providers/order-service';
/**
 * Generated class for the SalesByBills page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-sales-by-bills',
 	templateUrl: 'sales-by-bills.html',
 })
 export class SalesByBills {
 	public bills:Array<any>;
 	public date;
 	public type;
 	public total_price;
 	constructor(private orderService: OrderService, public navCtrl: NavController, public navParams: NavParams) {
 		this.total_price = 0;
 		this.date = this.navParams.get("date");
 		this.type = this.navParams.get("type");
 		this.bills = [];
 		this.getBillsByDate();
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad SalesByBills');
 	}
 	getBillsByDate(){
 		this.orderService.getBillsByDate(this.date, this.type).subscribe(
 			bills =>{
 				console.log(this.bills);
 				this.bills = bills;
 				bills.map(bill=>{
 					this.total_price += bill.total_price;
 				})
 			}
 			)
 	}
 }
