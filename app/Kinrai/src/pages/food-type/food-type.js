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
import { AlertController, NavController, NavParams, ModalController, ActionSheetController, ToastController, LoadingController } from 'ionic-angular';
import { OrderService } from '../../providers/order-service';
import { FoodPage } from '../food/food';
/*
  Generated class for the FoodType page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var FoodTypePage = (function () {
    function FoodTypePage(orderService, loadingCtrl, toastCtrl, alertCtrl, navCtrl, navParams, modalCtrl, actSheetCtrl) {
        this.orderService = orderService;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.actSheetCtrl = actSheetCtrl;
        this.categoryId = this.navParams.get('categoryId');
        this.category = {
            title: "",
            types: []
        };
    }
    FoodTypePage.prototype.ngOnInit = function () {
        this.getTypes(this.categoryId);
        // console.log(this.categoryId);
        console.log("this.categoryId");
    };
    FoodTypePage.prototype.ionViewDidLoad = function () {
        console.log('Hello FoodByTypePage Page');
    };
    FoodTypePage.prototype.openFood = function (typeId) {
        this.navCtrl.push(FoodPage, { categoryId: this.categoryId, typeId: typeId, cat: this.category });
    };
    FoodTypePage.prototype.getTypes = function (categoryId) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait a minute..."
        });
        loading.present().then(function () {
            _this.orderService.getTypes(categoryId).subscribe(function (res) {
                // console.log(res);
                // this.toast("we got types"); 
                _this.category = res;
                console.log(_this.category);
            }, function (err) {
                console.log(err);
                _this.toast(err);
            });
            loading.dismiss();
        });
    };
    FoodTypePage.prototype.newType = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: "New Type",
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
                        _this.orderService.newType(data.title, _this.categoryId).subscribe(function (res) {
                            //return types
                            _this.category = res;
                            // this.toast("New Type created");
                        }, function (err) {
                            _this.toast(err);
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    FoodTypePage.prototype.toast = function (messages) {
        var toast = this.toastCtrl.create({
            message: messages,
            duration: 3000
        });
        toast.present();
    };
    FoodTypePage.prototype.doRefresh = function (refresher) {
        this.getTypes(this.categoryId);
        // refresher.complete();
        // console.log(refresher);
        setTimeout(function () {
            refresher.complete();
        }, 0);
    };
    return FoodTypePage;
}());
FoodTypePage = __decorate([
    Component({
        selector: 'page-food-type',
        templateUrl: 'food-type.html',
        providers: [OrderService]
    }),
    __metadata("design:paramtypes", [OrderService,
        LoadingController,
        ToastController,
        AlertController,
        NavController,
        NavParams,
        ModalController,
        ActionSheetController])
], FoodTypePage);
export { FoodTypePage };
//# sourceMappingURL=food-type.js.map