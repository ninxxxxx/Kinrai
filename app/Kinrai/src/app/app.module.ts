import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';


import { MyApp } from './app.component';

//component
import { ModalAddFoodComponent } from '../components/modal-add-food/modal-add-food';
import { ModalAddOptionComponent } from '../components/modal-add-option/modal-add-option';
import { ModalAddOrderComponent } from '../components/modal-add-order/modal-add-order';
import { OrderListComponent } from '../components/order-list/order-list';
import { ModalPaymentComponent } from '../components/modal-payment/modal-payment';
//Pages
import { FoodCategoriesPage } from '../pages/food-categories/food-categories';
import { FoodTypePage } from '../pages/food-type/food-type';
import { FoodPage } from '../pages/food/food';
import { ManagementPage } from '../pages/management/management';
import { OrderMainPage } from '../pages/order-main/order-main';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ToppingPage } from '../pages/topping/topping';
import { ChooseFoodPage } from '../pages/choose-food/choose-food';
import { OrderSummaryPage } from '../pages/order-summary/order-summary';
import { BillPage } from '../pages/bill/bill';


@NgModule({
  declarations: [
  MyApp,
  ModalAddFoodComponent,
  ModalAddOptionComponent,
  ModalAddOrderComponent,
  OrderListComponent,
  FoodCategoriesPage,
  FoodTypePage,
  FoodPage,
  ManagementPage,
  OrderMainPage,
  TabsPage,
  HomePage,
  ToppingPage,
  ChooseFoodPage,
  OrderSummaryPage,
  BillPage,
  ModalPaymentComponent
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
  FoodPage,
  ManagementPage,
  OrderMainPage,
  TabsPage,
  HomePage,
  ToppingPage,
  ChooseFoodPage,
  OrderSummaryPage,
  BillPage,
  ModalPaymentComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
