import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { OrderSummaryPage } from '../../pages/order-summary/order-summary';
import { OrderMainPage } from '../order-main/order-main';
import { ModalAddFoodComponent } from '../../components/modal-add-food/modal-add-food';
import { ModalAddOrderComponent } from '../../components/modal-add-order/modal-add-order';
import { BillPage } from '../bill/bill';




@Component({
	templateUrl: 'tabs.html',
})

export class TabsPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page
	tab1Root: any = BillPage;
	tab3Root: any = OrderMainPage;
	


	constructor(public modalCtrl: ModalController) 
	{


	}

	openNewOrder(){
		// let modal = this.modalCtrl.create(ModalAddOrderComponent);
		let modal = this.modalCtrl.create(OrderSummaryPage);
		modal.present();
	}

	
}
