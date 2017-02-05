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
import { NavParams, NavController, ViewController, ToastController, ModalController, LoadingController } from 'ionic-angular';
import { ChooseFoodPage } from '../../pages/choose-food/choose-food';
import { OrderService } from '../../providers/order-service';
/*
  Generated class for the ModalAddOrder component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
    */
var ModalAddOrderComponent = (function () {
    function ModalAddOrderComponent(navParams, loadingCtrl, modalCtrl, toastCtrl, orderService, navCtrl, viewCtrl) {
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.orderService = orderService;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.toppings = [];
        this.isToggle = true;
        var o = this.navParams.get("order");
        if (o) {
            this.amount = o.amount;
            this.total = o.price;
            // this.isToggle = true;
            this.food = o.food;
            this.toppings = o.selected_toppings;
        }
        else {
            console.log("no order");
            this.amount = 1;
            this.total = 0;
            // this.isToggle = false;
            this.food = { title: "", type: { title: "" }, category: { title: "" }, toppings: [], price: 0 };
            this.order = { food: {}, selected_toppings: [], price: 0, };
            this.chooseFood();
        }
        // this.amount = 1;
        // this.total = 0;
        // this.isToggle = false;
        // this.food = {title:"", type: {title: ""}, category: {title: ""}, toppings: [], price: 0};
        // this.order = {food:{}, selected_toppings: [], price: 0,}
        this.getFullCats();
    }
    ModalAddOrderComponent.prototype.cancel = function () {
        this.viewCtrl.dismiss();
        this.viewCtrl.dismiss();
    };
    ModalAddOrderComponent.prototype.sumPrice = function () {
        var _this = this;
        this.total += this.food.price;
        this.toppings.map(function (top) { _this.total += top.price; });
    };
    ModalAddOrderComponent.prototype.getFullCats = function () {
        var _this = this;
        this.orderService.getFullCategories().subscribe(function (categories) {
            if (categories)
                _this.categories = categories;
        }, function (err) {
            _this.toast(err);
        });
    };
    ModalAddOrderComponent.prototype.toast = function (messages) {
        var toast = this.toastCtrl.create({
            message: messages,
            duration: 3000
        });
        toast.present();
    };
    ModalAddOrderComponent.prototype.getFood = function (foodId) {
        var _this = this;
        this.orderService.getFoodById(foodId).subscribe(function (res) {
            // console.log("res" + res);
            _this.food = res;
            _this.total += _this.food.price;
        }, function (err) {
            _this.toast(err);
        });
    };
    ModalAddOrderComponent.prototype.chooseFood = function () {
        var _this = this;
        this.total = 0;
        this.toppings = [];
        var modal = this.modalCtrl.create(ChooseFoodPage);
        modal.onDidDismiss(function (foodId) {
            // console.log(foodId);
            if (foodId)
                _this.getFood(foodId);
            else
                console.log("no food is back");
        });
        modal.present();
    };
    ModalAddOrderComponent.prototype.addInTo = function (topping, top) {
        console.log("addInto");
        var chosenTopping = { title: topping.title, optionTitle: top.title, price: top.price };
        console.log(chosenTopping);
        var chosenIndex = this.toppings.map(function (top) { return JSON.stringify(top); }).indexOf(JSON.stringify(chosenTopping)); //is in list?
        var currentchosenIndex = this.toppings.map(function (top) { return top.title; }).indexOf(chosenTopping.title); //same title?
        if (chosenIndex == -1) {
            if (currentchosenIndex > -1) {
                this.total -= this.toppings[currentchosenIndex].price;
                this.toppings.splice(currentchosenIndex, 1);
            }
            this.total += chosenTopping.price;
            this.toppings.push(chosenTopping);
        }
        else if (chosenIndex > -1) {
            this.total -= chosenTopping.price;
            this.toppings.splice(chosenIndex, 1);
        }
        // this.total += this.food.price;
    };
    ModalAddOrderComponent.prototype.toggleToppings = function () {
        this.isToggle = !this.isToggle;
    };
    ModalAddOrderComponent.prototype.gotoOrderSummary = function () {
        var order = {
            food: this.food,
            selected_toppings: this.toppings,
            price: this.total,
            amount: this.amount
        };
        // let modal = this.modalCtrl.create(OrderSummaryPage, {order});
        // modal.present();
        this.viewCtrl.dismiss(order);
    };
    return ModalAddOrderComponent;
}());
ModalAddOrderComponent = __decorate([
    Component({
        selector: 'modal-add-order',
        templateUrl: 'modal-add-order.html',
        providers: [OrderService]
    }),
    __metadata("design:paramtypes", [NavParams,
        LoadingController,
        ModalController,
        ToastController,
        OrderService,
        NavController,
        ViewController])
], ModalAddOrderComponent);
export { ModalAddOrderComponent };
//# sourceMappingURL=modal-add-order.js.map