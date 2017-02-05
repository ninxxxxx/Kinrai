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
import { NavController, AlertController, ModalController, LoadingController, ToastController } from 'ionic-angular';
import { OrderService } from '../../providers/order-service';
import { FoodTypePage } from '../food-type/food-type';
/*
  Generated class for the FoodCategories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var FoodCategoriesPage = (function () {
    function FoodCategoriesPage(orderService, loadCtrl, toastCtrl, navCtrl, alertCtrl, modalCtrl) {
        this.orderService = orderService;
        this.loadCtrl = loadCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        // this.categories = [
        // 	"Main Dish",
        // 	"Snack",
        // 	"Drink"
        // ]
    }
    FoodCategoriesPage.prototype.ngOnInit = function () {
        this.getCategories();
        // console.log(this.categories);
    };
    FoodCategoriesPage.prototype.ionViewDidLoad = function () {
        // console.log(this.getCategories());
        // this.categories = this.getCategories();
        // console.log(this.categories);
        // console.log('Hello FoodsPage Page');
        // this.categories = this.getCategories();
        // this.openType("Main Dish");
    };
    FoodCategoriesPage.prototype.getCategories = function () {
        var _this = this;
        var loading = this.loadCtrl.create({
            content: "Please wait a minute..."
        });
        loading.present().then(function () {
            _this.orderService.getCategories().subscribe(function (res) {
                // console.log(res);
                _this.categories = res;
                // this.toast("we got all Category"); 
                // return res;
            }, function (err) {
                console.log(err);
                _this.toast(err);
            });
            loading.dismiss();
        });
    };
    FoodCategoriesPage.prototype.openType = function (categoryId) {
        // let modal = this.modalCtrl.create(FoodTypePage, {currentCat: category, categories: this.categories});
        // modal.present();
        this.navCtrl.push(FoodTypePage, { categoryId: categoryId });
    };
    FoodCategoriesPage.prototype.openPrompt = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "New Category",
            inputs: [
                { name: 'title', placeholder: 'Title' }
            ],
            buttons: [
                {
                    text: 'cancel',
                    role: 'cancel'
                },
                {
                    text: 'save',
                    handler: function (data) {
                        _this.orderService.newCategory(data.title).subscribe(function (res) {
                            console.log(res);
                            _this.categories = res;
                            _this.toast("New Category created");
                        }, function (err) {
                            _this.toast(err);
                        });
                        // if(data.title)
                        //   this.categories.push(data.title);
                    }
                }
            ]
        });
        alert.present();
    };
    FoodCategoriesPage.prototype.toast = function (messages) {
        var toast = this.toastCtrl.create({
            message: messages,
            duration: 3000
        });
        toast.present();
    };
    FoodCategoriesPage.prototype.presentLoading = function () {
        var loading = this.loadCtrl.create({
            content: "Please wait a minute"
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 2000);
    };
    FoodCategoriesPage.prototype.doRefresh = function (refresher) {
        this.getCategories();
        // refresher.complete();
        // console.log(refresher);
        setTimeout(function () {
            refresher.complete();
        }, 0);
    };
    return FoodCategoriesPage;
}());
FoodCategoriesPage = __decorate([
    Component({
        selector: 'page-food-categories',
        templateUrl: 'food-categories.html',
        providers: [OrderService]
    }),
    __metadata("design:paramtypes", [OrderService,
        LoadingController,
        ToastController,
        NavController,
        AlertController,
        ModalController])
], FoodCategoriesPage);
export { FoodCategoriesPage };
//# sourceMappingURL=food-categories.js.map