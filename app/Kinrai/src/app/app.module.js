var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
//component
import { ModalAddFoodComponent } from '../components/modal-add-food/modal-add-food';
import { ModalAddOptionComponent } from '../components/modal-add-option/modal-add-option';
import { ModalAddOrderComponent } from '../components/modal-add-order/modal-add-order';
import { OrderListComponent } from '../components/order-list/order-list';
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
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
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
            OrderSummaryPage
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
            OrderSummaryPage
        ],
        providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map