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
import { LoadingController, ToastController, NavController, NavParams, ModalController } from 'ionic-angular';
import { OrderService } from '../../providers/order-service';
import { ModalAddOptionComponent } from '../../components/modal-add-option/modal-add-option';
/*
  Generated class for the Topping page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var ToppingPage = (function () {
    function ToppingPage(modalCtrl, loadingCtrl, toastCtrl, orderService, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.orderService = orderService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toppings = [];
        this.getTopping();
        // this.getTopping();
    }
    ToppingPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ToppingPage');
    };
    ToppingPage.prototype.getTopping = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait a minute..."
        });
        loading.present().then(function () {
            _this.orderService.getTopping().subscribe(function (toppings) {
                _this.toppings = toppings;
            }, function (err) {
                _this.toast(err);
            });
        });
        loading.dismiss();
    };
    ToppingPage.prototype.newTopping = function () {
        var _this = this;
        var modal = this.modalCtrl.create(ModalAddOptionComponent);
        modal.onDidDismiss(function (toppings) {
            console.log(toppings);
            if (toppings)
                _this.toppings = toppings;
        });
        modal.present();
    };
    ToppingPage.prototype.setCurrentTopping = function (topping) {
        if (this.curTopping == topping)
            this.curTopping = null;
        else
            this.curTopping = topping;
    };
    ToppingPage.prototype.toast = function (messages) {
        var toast = this.toastCtrl.create({
            message: messages,
            duration: 3000
        });
        toast.present();
    };
    return ToppingPage;
}());
ToppingPage = __decorate([
    Component({
        selector: 'page-topping',
        templateUrl: 'topping.html',
        providers: [OrderService]
    }),
    __metadata("design:paramtypes", [ModalController, LoadingController, ToastController, OrderService, NavController, NavParams])
], ToppingPage);
export { ToppingPage };
//# sourceMappingURL=topping.js.map