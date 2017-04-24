import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Tabs } from 'ionic-angular';
// import { StatusBar } from '@ionic-native/statusbar';
// import { Splashscreen } from '@ionic-native/splashscreen';

import { TabsPage } from '../pages/tabs/tabs';
import { OrderMainPage } from '../pages/order-main/order-main';
import { ManagementPage } from '../pages/management/management';
import { ModalAddFoodComponent } from '../components/modal-add-food/modal-add-food';
import { FoodCategoriesPage } from '../pages/food-categories/food-categories';
import { TablePage } from '../pages/table/table';
import { SaleHistoryPage }  from '../pages/sale-history/sale-history';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  // rootPage = SaleHistoryPage;
  groupPages: Array<{name: string, pages:Array<{title: string, component: any}>}>;

  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform) {
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
      {title: 'Sale History', component: SaleHistoryPage},
      // {title: 'Promotion', component: ManagementPage},
      ]
    }
    ];

  }
  openPage(page){
    this.nav.push(page);
  }

}
