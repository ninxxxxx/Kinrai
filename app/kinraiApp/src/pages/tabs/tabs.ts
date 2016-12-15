import { Component } from '@angular/core';
import {ModalController} from 'ionic-angular';

import { ContactPage } from '../contact/contact';
import { QueueMainPage} from '../queue-main/queue-main';

import {ModalAddQueuePage} from '../modal-add-queue/modal-add-queue';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = QueueMainPage;
  tab3Root: any = ContactPage;

  constructor(public modalCtrl: ModalController) {

  }

  showCreateFoodModal(){
  	let modal = this.modalCtrl.create(ModalAddQueuePage);
  	modal.present();
  }

}
