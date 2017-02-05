var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { OrderSummaryPage } from '../../pages/order-summary/order-summary';
import { OrderMainPage } from '../order-main/order-main';
import { ManagementPage } from '../management/management';
var TabsPage = (function () {
    function TabsPage(modalCtrl) {
        this.modalCtrl = modalCtrl;
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = OrderMainPage;
        this.tab3Root = ManagementPage;
    }
    TabsPage.prototype.openNewOrder = function () {
        // let modal = this.modalCtrl.create(ModalAddOrderComponent);
        var modal = this.modalCtrl.create(OrderSummaryPage);
        modal.present();
    };
    return TabsPage;
}());
TabsPage = __decorate([
    Component({
        templateUrl: 'tabs.html',
    }),
    __metadata("design:paramtypes", [ModalController])
], TabsPage);
export { TabsPage };
//# sourceMappingURL=tabs.js.map