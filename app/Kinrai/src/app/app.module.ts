import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';

//Pages
import { ModalAddFoodComponent } from '../components/modal-add-food/modal-add-food';
import { ModalAddOptionComponent } from '../components/modal-add-option/modal-add-option';
import { ModalAddOrderComponent } from '../components/modal-add-order/modal-add-order';
import { OrderListComponent } from '../components/order-list/order-list';
//component
import { FoodCategoriesPage } from '../pages/food-categories/food-categories';
import { FoodTypePage } from '../pages/food-type/food-type';
import { ManagementPage } from '../pages/management/management';
import { OrderMainPage } from '../pages/order-main/order-main';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';


@NgModule({
  declarations: [
  MyApp,
  ModalAddFoodComponent,
  ModalAddOptionComponent,
  ModalAddOrderComponent,
  OrderListComponent,
  FoodCategoriesPage,
  FoodTypePage,
  ManagementPage,
  OrderMainPage,
  TabsPage,
  HomePage,
  ],
  imports: [
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  ModalAddFoodComponent,
  ModalAddOptionComponent,
  ModalAddOrderComponent,
  OrderListComponent,
  FoodCategoriesPage,
  FoodTypePage,
  ManagementPage,
  OrderMainPage,
  TabsPage,
  HomePage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}