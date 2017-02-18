import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { OrderSummaryPage } from '../../pages/order-summary/order-summary';
import { OrderMainPage } from '../order-main/order-main';
import { ModalAddFoodComponent } from '../../components/modal-add-food/modal-add-food';
import { ModalAddOrderComponent } from '../../components/modal-add-order/modal-add-order';
import { BillPage } from '../bill/bill';

import { OrderService } from '../../providers/order-service';

declare var io;



@Component({
	templateUrl: 'tabs.html',
	providers: [OrderService]
})

export class TabsPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page
	tab1Root: any = BillPage;
	tab3Root: any = OrderMainPage;
	
	socket: any;


	constructor(private orderService: OrderService, public modalCtrl: ModalController) 
	{


	}

	openNewOrder(){
		// let modal = this.modalCtrl.create(ModalAddOrderComponent);
		let modal = this.modalCtrl.create(OrderSummaryPage);
		modal.present();
	}

	
}
