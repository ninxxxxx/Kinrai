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
import { NavController, ViewController } from 'ionic-angular';
import { OrderService } from '../../providers/order-service';
/*
  Generated class for the ModalAddOption component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
    */
var ModalAddOptionComponent = (function () {
    function ModalAddOptionComponent(orderService, navCtrl, viewCtrl) {
        this.orderService = orderService;
        this.navCtrl = navCtrl;
        this.viewCtrl = viewCtrl;
        this.options = [];
        this.option = {
            title: "",
            price: ""
        };
    }
    ModalAddOptionComponent.prototype.ionViewDidLoad = function () {
        console.log('Hello ModalNewOptionPage Page');
    };
    ModalAddOptionComponent.prototype.addOption = function (option) {
        this.options.push(option);
        this.option = { title: "", price: "" };
    };
    ModalAddOptionComponent.prototype.removeTop = function (top) {
        var index = this.options.map(function (option) { return option.title; }).indexOf(top.title);
        this.options.splice(index, 1);
    };
    ModalAddOptionComponent.prototype.newTopping = function () {
        var _this = this;
        var topping = {
            title: this.title,
            tops: this.options
        };
        this.orderService.newTopping(topping).subscribe(function (toppings) {
            console.log("save ?");
            _this.toppings = toppings;
            _this.viewCtrl.dismiss(_this.toppings);
        }, function (err) {
            console.log(err);
        });
        // console.log("in modal");
        // console.log(this.toppings);
    };
    ModalAddOptionComponent.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    return ModalAddOptionComponent;
}());
ModalAddOptionComponent = __decorate([
    Component({
        selector: 'modal-add-option',
        templateUrl: 'modal-add-option.html',
        providers: [OrderService]
    }),
    __metadata("design:paramtypes", [OrderService, NavController, ViewController])
], ModalAddOptionComponent);
export { ModalAddOptionComponent };
//# sourceMappingURL=modal-add-option.js.map