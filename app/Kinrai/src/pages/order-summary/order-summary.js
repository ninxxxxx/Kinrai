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
import { ToastController, ViewController, NavController, NavParams, ModalController } from 'ionic-angular';
import { OrderService } from '../../providers/order-service';
import { ModalAddOrderComponent } from '../../components/modal-add-order/modal-add-order';
var OrderSummaryPage = (function () {
    function OrderSummaryPage(toastCtrl, orderService, modalCtrl, navCtrl, navParams, viewCtrl) {
        this.toastCtrl = toastCtrl;
        this.orderService = orderService;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.orders = [];
        this.tableNumber = "";
        this.totalWaitTime = 0;
        this.totalPrice = 0;
        this.openNewOrder();
        // let firstOrder = this.navParams.get('order');
        // this.orders.push(firstOrder);
        this.socket = io(this.orderService.server);
    }
    OrderSummaryPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderSummaryPage');
    };
    OrderSummaryPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    OrderSummaryPage.prototype.openNewOrder = function () {
        var _this = this;
        var modal = this.modalCtrl.create(ModalAddOrderComponent);
        modal.onDidDismiss(function (order) {
            if (order) {
                console.log("order: ");
                console.log(order);
                _this.orders.push(order);
                _this.calWaitTime();
                _this.calTotalPrice();
            }
        });
        modal.present();
    };
    OrderSummaryPage.prototype.createBill = function () {
        var _this = this;
        console.log(this.orders);
        var bill = {
            table_number: this.tableNumber,
            orders: this.orders,
            total_price: this.totalPrice
        };
        this.orderService.createBill(bill).subscribe(function (res) {
            _this.toast(res);
        }, function (err) {
            _this.toast(err);
        });
        setTimeout(function () {
            _this.socket.emit("orders changed", "...");
            _this.viewCtrl.dismiss();
        }, 1000);
    };
    OrderSummaryPage.prototype.toast = function (messages) {
        var toast = this.toastCtrl.create({
            message: messages,
            duration: 3000
        });
        toast.present();
    };
    OrderSummaryPage.prototype.calWaitTime = function () {
        var _this = this;
        this.orders.map(function (order) {
            _this.totalWaitTime += order.food.estimate_time;
        });
    };
    OrderSummaryPage.prototype.calTotalPrice = function () {
        var _this = this;
        this.totalPrice = 0;
        this.orders.map(function (order) {
            _this.totalPrice += (order.price * order.amount);
        });
    };
    OrderSummaryPage.prototype.editOrder = function (order) {
        var modal = this.modalCtrl.create(ModalAddOrderComponent, { order: order });
        modal.onDidDismiss(function (order) {
            console.log("==>");
            console.log(order);
        });
        modal.present();
    };
    return OrderSummaryPage;
}());
OrderSummaryPage = __decorate([
    Component({
        selector: 'page-order-summary',
        templateUrl: 'order-summary.html',
        providers: [OrderService]
    }),
    __metadata("design:paramtypes", [ToastController,
        OrderService,
        ModalController,
        NavController,
        NavParams,
        ViewController])
], OrderSummaryPage);
export { OrderSummaryPage };
//# sourceMappingURL=order-summary.js.map