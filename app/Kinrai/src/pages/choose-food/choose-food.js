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
import { ActionSheetController, Slides, LoadingController, NavParams, NavController, ViewController, ToastController, ModalController } from 'ionic-angular';
import { OrderService } from '../../providers/order-service';
/*
  Generated class for the ChooseFood page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
var ChooseFoodPage = (function () {
    function ChooseFoodPage(viewCtrl, actSheetCtrl, loadingCtrl, toastCtrl, modalCtrl, orderService, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.actSheetCtrl = actSheetCtrl;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
        this.orderService = orderService;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.categories = [];
        this.curCategory = { title: "" };
        this.curType = { title: "" };
        this.getFullCats();
    }
    ChooseFoodPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ChooseFoodPage');
    };
    ChooseFoodPage.prototype.getFullCats = function () {
        var _this = this;
        this.orderService.getFullCategories().subscribe(function (categories) {
            if (categories)
                _this.categories = categories;
            _this.curCategory = _this.categories[0];
            _this.curType = _this.categories[0].types[0];
        }, function (err) {
            _this.toast(err);
        });
    };
    ChooseFoodPage.prototype.selectCategory = function () {
        var _this = this;
        var catButtons = [];
        if (this.categories.length != 0) {
            this.categories.forEach(function (cat) {
                if (cat.types.length != 0) {
                    catButtons.push({
                        text: cat.title,
                        handler: function () {
                            _this.curCatText = cat.title;
                            _this.curCategory = cat;
                            _this.curType = cat.types[0];
                            _this.curTypeText = cat.types[0].title;
                            // this.curCategory.types.forEach(type =>{
                            //   if(type.foods.length != 0){
                            //     if(this.curTypeText == ""){
                            //       this.curType = type;
                            //       this.curTypeText = type.title;
                            //     }
                            //   }
                            // });
                        }
                    });
                }
            });
        }
        var actionsheet = this.actSheetCtrl.create({
            title: "select category",
            buttons: catButtons
        });
        actionsheet.present();
    };
    ChooseFoodPage.prototype.selectType = function () {
        var _this = this;
        var types = [];
        if (this.curCategory.types.length != 0) {
            this.curCategory.types.forEach(function (type) {
                if (type.foods.length != 0) {
                    types.push({
                        text: type.title,
                        handler: function () {
                            _this.curTypeText = type.title;
                            _this.curType = type;
                            // let typeIndex = this.curCategory.types.map((type)=>{return type.title}).indexOf(type.title);
                            // this.slides.slideTo(typeIndex);
                        },
                    });
                }
            });
        }
        var actionsheet = this.actSheetCtrl.create({
            title: "select food's type",
            buttons: types
        });
        actionsheet.present();
    };
    // slideChanged(){
    //   console.log(this.slides.getActiveIndex());
    //   // this.typeId = this.curCategory.types[this.typeIndex]._id;
    //   // console.log(this.typeId);
    //   this.curTypeText = this.curCategory.types[this.slides.getActiveIndex()].title;
    //   // console.log("Current Index" + this.slides.getActiveIndex() + " Type: " + this.curCategory.types[this.slides.getActiveIndex()].title); 
    //   if(this.slides.isEnd())
    //   {  
    //     console.log("get lock next");
    //     this.slides.lockSwipeToNext(true);
    //     this.slides.lockSwipeToPrev(false);
    //   }
    //   else if(this.slides.isBeginning()) 
    //   {
    //     console.log("get lock prev");
    //     this.slides.lockSwipeToPrev(true);
    //     this.slides.lockSwipeToNext(false);
    //   }
    //   else this.slides.lockSwipes(false);
    // }
    ChooseFoodPage.prototype.choose = function (foodId) {
        console.log("foodId: " + foodId);
        this.viewCtrl.dismiss(foodId);
    };
    ChooseFoodPage.prototype.toast = function (messages) {
        var toast = this.toastCtrl.create({
            message: messages,
            duration: 3000
        });
        toast.present();
    };
    ChooseFoodPage.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    return ChooseFoodPage;
}());
__decorate([
    ViewChild(Slides),
    __metadata("design:type", Slides)
], ChooseFoodPage.prototype, "slides", void 0);
ChooseFoodPage = __decorate([
    Component({
        selector: 'page-choose-food',
        templateUrl: 'choose-food.html',
        providers: [OrderService]
    }),
    __metadata("design:paramtypes", [ViewController,
        ActionSheetController,
        LoadingController,
        ToastController,
        ModalController,
        OrderService,
        NavController,
        NavParams])
], ChooseFoodPage);
export { ChooseFoodPage };
//# sourceMappingURL=choose-food.js.map