import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { MyApp } from './app.component';


import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { DatePicker } from '@ionic-native/date-picker';

//external libs
import {ChartsModule} from 'ng2-charts/ng2-charts';



//providers
import { OrderService } from '../providers/order-service';


//component
import { ModalAddFoodComponent } from '../components/modal-add-food/modal-add-food';
import { ModalAddOptionComponent } from '../components/modal-add-option/modal-add-option';
import { ModalAddOrderComponent } from '../components/modal-add-order/modal-add-order';
import { OrderListComponent } from '../components/order-list/order-list';
import { ModalPaymentComponent } from '../components/modal-payment/modal-payment';
import { SalesGraph } from '../components/sales-graph/sales-graph';
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
import { PreodersPage } from '../pages/preoders/preoders';
import { TablePage } from '../pages/table/table';
import { SelectTablePage } from '../pages/select-table/select-table';
import { SaleHistoryPage } from '../pages/sale-history/sale-history';
import { FoodRanking } from '../pages/food-ranking/food-ranking';

import '../../node_modules/chart.js/src/chart.js';


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
  ModalPaymentComponent,
  PreodersPage,
  TablePage,
  SelectTablePage,
  SaleHistoryPage,
  SalesGraph,
  FoodRanking
  ],
  imports: [
  ChartsModule,
  HttpModule,
  BrowserModule,
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
  ModalPaymentComponent,
  PreodersPage,
  TablePage,
  SelectTablePage,
  SaleHistoryPage,
  SalesGraph,
  FoodRanking
  ],
  providers: [
  {provide: ErrorHandler, useClass: IonicErrorHandler}, File, FileChooser, FilePath, DatePicker, OrderService
  ]
})
export class AppModule {}
