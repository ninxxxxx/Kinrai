import { Component } from '@angular/core';
import { LoadingController, ToastController, NavController, NavParams, ModalController } from 'ionic-angular';


import { OrderService } from '../../providers/order-service';
import { ModalAddOptionComponent } from '../../components/modal-add-option/modal-add-option';
/*
  Generated class for the Topping page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-topping',
  	templateUrl: 'topping.html',
  	providers: [OrderService]
  })
  export class ToppingPage {
  	toppings: any;
  	curTopping: any;
  	constructor(public modalCtrl: ModalController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private orderService: OrderService, public navCtrl: NavController, public navParams: NavParams) {
  		this.toppings = [
  		// {
  		// 	title: "Hot",
  		// 	tops: [
  		// 	{title: "normal", price: 0},
  		// 	{title: "spicy", price: 0},
  		// 	{title: "very spicy", price: 0},
  		// 	]
  		// },
  		// {
  		// 	title: "Size",
  		// 	tops: [
  		// 	{title: "medium", price: 0},
  		// 	{title: "Big", price: 10},
  		// 	{title: "very Big", price: 20},
  		// 	]
  		// }

  		];
  		this.getTopping();
  		// this.getTopping();
  	}

  	ionViewDidLoad() {
  		console.log('ionViewDidLoad ToppingPage');
  	}

  	getTopping(){
  		let loading = this.loadingCtrl.create({
  			content: "Please wait a minute..."
  		});

  		loading.present().then(()=>{
  			this.orderService.getTopping().subscribe(
  				toppings => {
  					this.toppings = toppings;
  				},
  				err =>{
  					this.toast(err);
  				});
  		});
  		loading.dismiss();
  	}

  	newTopping(){
  		let modal = this.modalCtrl.create(ModalAddOptionComponent)
  		modal.onDidDismiss(toppings=>{
  			console.log(toppings);
  			if(toppings)
  				this.toppings = toppings;
  		})
  		modal.present();

  	}

  	setCurrentTopping(topping){
  		if(this.curTopping == topping) 
  			this.curTopping = null;
  		else 
  			this.curTopping = topping;
  	}








  	toast(messages){
  		let toast = this.toastCtrl.create({
  			message: messages,
  			duration: 3000
  		});
  		toast.present();
  	}
  }
