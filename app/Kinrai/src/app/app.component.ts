import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Tabs, ModalController } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/statusbar';
// import { Splashscreen } from '@ionic-native/splashscreen';

import { TabsPage } from '../pages/tabs/tabs';
import { FoodCategoriesPage } from '../pages/food-categories/food-categories';
import { TablePage } from '../pages/table/table';
import { SaleHistoryPage }  from '../pages/sale-history/sale-history';
import { SalesByBills } from '../pages/sales-by-bills/sales-by-bills';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  // rootPage = SaleHistoryPage;
  // rootPage = SalesByBills;
  groupPages: Array<{name: string, pages:Array<{title: string, component: any}>}>;

  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform, public modalCtrl: ModalController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      // Splashscreen.hide();
    });
    this.groupPages = [
    {
      name: "Home", 
      pages: [{title: 'Order/Payment', component: TabsPage}]
    },
    {
      name: "Managements",
      pages: [
      {title: 'Foods', component: FoodCategoriesPage},
      {title: 'Tables', component: TablePage},
      {title: 'Sale Analyzing', component: SaleHistoryPage},
      // {title: 'Promotion', component: ManagementPage},
      ]
    }
    ];

  }
  openPage(page){
    let modal = this.modalCtrl.create(page);
    modal.present();
    // this.nav.push(page);
  }

}
