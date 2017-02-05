var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, ActionSheetController, Slides, ToastController, LoadingController, ViewController } from 'ionic-angular';
import { OrderService } from '../../providers/order-service';
import { ToppingPage } from '../../pages/topping/topping';
import { ModalAddFoodComponent } from '../../components/modal-add-food/modal-add-food';
/*
  Generated class for the Food page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var FoodPage = (function () {
    // selectTypes: Array<any>;    
    function FoodPage(orderService, toastCtrl, navCtrl, navParams, modalCtrl, actSheetCtrl, viewCtrl, loadingCtrl) {
        this.orderService = orderService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.actSheetCtrl = actSheetCtrl;
        this.viewCtrl = viewCtrl;
        this.loadingCtrl = loadingCtrl;
        this.category = this.navParams.get('cat');
        // this.category = {title:"", types:[]};
        this.categoryId = this.navParams.get('categoryId');
        this.typeId = this.navParams.get('typeId');
    }
    FoodPage.prototype.ngOnInit = function () {
        this.getCategory(this.categoryId);
        console.log("ngOnInit");
        // this.getCategory(this.categoryId);
    };
    FoodPage.prototype.ionViewDidLoad = function () {
        console.log('Hello FoodByTypePage Page');
    };
    FoodPage.prototype.getCategory = function (categoryId) {
        var _this = this;
        var loading = this.loadingCtrl.create({
            content: "Please wait a minute..."
        });
        loading.present().then(function () {
            _this.orderService.getAllFoodFromCat(categoryId).subscribe(function (res) {
                _this.category = res;
                _this.typeIndex = _this.category.types.map(function (type) { return type._id; }).indexOf(_this.typeId);
                console.log("d[wp: " + _this.typeIndex);
                if (_this.category.types.length !== 0)
                    _this.currentType = _this.category.types[_this.typeIndex].title;
                else
                    _this.currentType = "";
                _this.slides.slideTo(_this.typeIndex);
            }, function (err) {
                console.log(err);
                _this.toast(err);
            });
            loading.dismiss();
        });
    };
    FoodPage.prototype.selectType = function () {
        var _this = this;
        var types = [];
        if (this.category.types.length != 0) {
            this.category.types.forEach(function (type) {
                types.push({
                    text: type.title,
                    handler: function () {
                        var typeIndex = _this.category.types.map(function (type) { return type.title; }).indexOf(type.title);
                        _this.currentType = type.title;
                        _this.slides.slideTo(typeIndex);
                    },
                });
            });
            var actionsheet = this.actSheetCtrl.create({
                title: "select food's type",
                buttons: types
            });
            actionsheet.present();
        }
    };
    FoodPage.prototype.slideChanged = function () {
        console.log(this.slides.getActiveIndex());
        this.typeIndex = this.slides.getActiveIndex();
        this.typeId = this.category.types[this.typeIndex]._id;
        console.log(this.typeId);
        this.currentType = this.category.types[this.typeIndex].title;
        // console.log("Current Index" + this.slides.getActiveIndex() + " Type: " + this.category.types[this.slides.getActiveIndex()].title); 
        if (this.slides.isEnd()) {
            console.log("get lock next");
            this.slides.lockSwipeToNext(true);
            this.slides.lockSwipeToPrev(false);
        }
        else if (this.slides.isBeginning()) {
            console.log("get lock prev");
            this.slides.lockSwipeToPrev(true);
            this.slides.lockSwipeToNext(false);
        }
        else
            this.slides.lockSwipes(false);
    };
    FoodPage.prototype.openModalNewFood = function () {
        var _this = this;
        var modal = this.modalCtrl
            .create(ModalAddFoodComponent, {
            category: this.category,
            currentType: this.category.types[this.slides.getActiveIndex()]
        });
        modal.onDidDismiss(function (typeId) {
            if (typeId) {
                _this.typeId = typeId;
                _this.getCategory(_this.categoryId);
            }
            // this.typeId = typeId;
            // this.typeIndex 
            // this.events.push(event);
        });
        modal.present();
    };
    FoodPage.prototype.openTopping = function () {
        this.navCtrl.push(ToppingPage);
    };
    //=============Utilities=============
    FoodPage.prototype.toast = function (messages) {
        var toast = this.toastCtrl.create({
            message: messages,
            duration: 3000
        });
        toast.present();
    };
    FoodPage.prototype.doRefresh = function (refresher) {
        // this.typeIndex = this.slides.getActiveIndex();
        this.getCategory(this.categoryId);
        // refresher.complete();
        // console.log(refresher);
        setTimeout(function () {
            refresher.complete();
        }, 0);
    };
    return FoodPage;
}());
__decorate([
    ViewChild(Slides),
    __metadata("design:type", Slides)
], FoodPage.prototype, "slides", void 0);
FoodPage = __decorate([
    Component({
        selector: 'page-food',
        templateUrl: 'food.html',
        providers: [OrderService]
    }),
    __metadata("design:paramtypes", [OrderService,
        ToastController,
        NavController,
        NavParams,
        ModalController,
        ActionSheetController,
        ViewController,
        LoadingController])
], FoodPage);
export { FoodPage };
//# sourceMappingURL=food.js.map