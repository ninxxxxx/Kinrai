var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
/*
  Generated class for the OrderService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
var OrderService = (function () {
    function OrderService(http) {
        this.http = http;
        this.server = 'http://172.30.230.103:8080/'; //lan
        // this.server = 'http://172.30.88.77:8080/'; //psu802
        // this.server = 'http://172.30.80.115:8080/';
        // this.server = 'http://172.30.80.103:8080/';
        // this.server = 'http://172.30.80.25:8080/'; //coe
        // this.server = 'http://192.168.1.102:5555/';
    }
    OrderService.prototype.getCategories = function () {
        var url = this.server + 'category';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.getFullCategories = function () {
        var url = this.server + 'category/getfull';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.newCategory = function (categoryTitle) {
        var url = this.server + 'category/new';
        var response = this.http.post(url, { categoryTitle: categoryTitle }).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.getTypes = function (categoryId) {
        var url = this.server + 'type';
        var response = this.http.post(url, { categoryId: categoryId }).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.newType = function (typeTitle, categoryId) {
        var url = this.server + 'type/new';
        var response = this.http.post(url, { typeTitle: typeTitle, categoryId: categoryId }).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.getAllFoodFromCat = function (categoryId) {
        var url = this.server + 'food';
        var response = this.http.post(url, { categoryId: categoryId }).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.getFoodById = function (foodId) {
        var url = this.server + 'food/getById';
        // let header = new Headers({ 'content-type' : 'application/json' });
        // let options = new RequestOptions({ headers: header});
        var response = this.http.post(url, { foodId: foodId }).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.createFood = function (food, image) {
        var url = this.server + 'newfood';
        var header = new Headers({ 'content-type': 'application/json' });
        var options = new RequestOptions({ headers: header });
        var response = this.http.post(url, { food: food, image: image }, options).map(function (res) { return res.json(); });
        // console.log(response);
        return response;
    };
    OrderService.prototype.getTopping = function () {
        var url = this.server + 'topping';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.newTopping = function (topping) {
        var url = this.server + 'topping/new';
        var response = this.http.post(url, { topping: topping }).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.getOrders = function () {
        // let url = 'http://localhost:5555/foods';
        var url = this.server + 'orders/';
        console.log(url);
        // let url = 'http://192.168.43.252:5555/foods';
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.getOrderByFilter = function (chosenCats) {
        // let url = 'http://localhost:5555/foods';
        var url = this.server + 'orders/findbycategories';
        console.log(url);
        // let url = 'http://192.168.43.252:5555/foods';
        var response = this.http.post(url, { chosenCats: chosenCats }).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.createOrder = function (food) {
        // let url = this.server + 'newOrder'
        var url = this.server + 'newfood';
        var header = new Headers({ 'content-type': 'application/json' });
        var options = new RequestOptions({ headers: header });
        var amount = 2;
        var response = this.http.post(url, { food: food, amount: amount }, options).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.changeOrderStatus = function (order_id, status) {
        var url = this.server + 'order/' + order_id + "/changestatus/" + status;
        // console.log(url);
        var response = this.http.get(url).map(function (res) { return res.json(); });
        return response;
    };
    OrderService.prototype.createBill = function (bill) {
        var url = this.server + 'bill/new';
        var response = this.http.post(url, { bill: bill }).map(function (res) { return res.json(); });
        return response;
    };
    return OrderService;
}());
OrderService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], OrderService);
export { OrderService };
//# sourceMappingURL=order-service.js.map