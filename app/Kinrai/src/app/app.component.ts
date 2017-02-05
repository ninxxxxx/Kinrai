import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Tabs } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { OrderMainPage } from '../pages/order-main/order-main';
import { ManagementPage } from '../pages/management/management';
import { ModalAddFoodComponent } from '../components/modal-add-food/modal-add-food';
import { FoodCategoriesPage } from '../pages/food-categories/food-categories';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  groupPages: Array<{name: string, pages:Array<{title: string, component: any}>}>;

  @ViewChild(Nav) nav: Nav;
  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
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
      {title: 'Promotion', component: ManagementPage},
      {title: 'Sales History', component: ManagementPage},
      ]
    }
    ];

  }
  openPage(page){
    this.nav.push(page);
  }

}
