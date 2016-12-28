import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { OrderMainPage } from '../order-main/order-main';
import { ModalAddFoodComponent } from '../../components/modal-add-food/modal-add-food';
import { ManagementPage } from '../management/management';

@Component({
	templateUrl: 'tabs.html'
})
export class TabsPage {
	// this tells the tabs component which Pages
	// should be each tab's root Page
	tab1Root: any = OrderMainPage;
	tab3Root: any = ManagementPage;

	constructor(public modalCtrl: ModalController) {

	}
	showCreateFoodModal(){
		let modal = this.modalCtrl.create(ModalAddFoodComponent);
		modal.present();
	}
}
