import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { QueueMainPage } from '../pages/queue-main/queue-main';
import { TabsPage } from '../pages/tabs/tabs';
import { ManagementsPage } from '../pages/managements/managements';
import { FoodCategoriesPage } from '../pages/food-categories/food-categories';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = TabsPage;
  groupPages: Array<{name: string, pages:Array<{title: string, component: any}>}>;

  @ViewChild(Nav) nav: Nav;
  constructor(public platform: Platform) {
    this.initializeApp();

    this.groupPages = [
    {
      name: "Home", 
      pages: [{title: 'Order/Payment', component: TabsPage}]
    },
    {
      name: "Managements",
      pages: [
        {title: 'Foods', component: FoodCategoriesPage},
        {title: 'Promotion', component: ManagementsPage},
        {title: 'Sales History', component: ManagementsPage},
      ]
    }
    ];

  }

  initializeApp(){
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page){
    this.nav.push(page);
  }  
}
