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
import { NavController, ViewController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { File, FileChooser } from 'ionic-native';
import { OrderService } from '../../providers/order-service';
import { ModalAddOptionComponent } from '../modal-add-option/modal-add-option';
var ModalAddFoodComponent = (function () {
    function ModalAddFoodComponent(navCtrl, viewCtlr, modalCtrl, toastCtrl, navParams, orderService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.viewCtlr = viewCtlr;
        this.modalCtrl = modalCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.currentCategory = this.navParams.get('category');
        this.currentType = this.navParams.get('currentType');
        this.getToppings();
        this.food = {
            title: "",
            price: 0,
            type: this.currentType,
            category: this.currentCategory,
            estimate_time: 0,
            img_url: "",
            ordered_count: 0,
            toppings: [],
        };
        document.addEventListener('deviceready', function () {
            console.log("Device is Ready: window.Permissions");
            _this.permissions = cordova.plugins.permissions;
        });
    }
    ModalAddFoodComponent.prototype.openNewOption = function () {
        var modal = this.modalCtrl.create(ModalAddOptionComponent);
        modal.present();
    };
    ModalAddFoodComponent.prototype.cancel = function () {
        this.viewCtlr.dismiss();
    };
    ModalAddFoodComponent.prototype.toast = function (messages) {
        var toast = this.toastCtrl.create({
            message: messages,
            duration: 3000
        });
        toast.present();
    };
    ModalAddFoodComponent.prototype.changeCurCat = function (category) {
        this.currentCategory = category;
        console.log("cat chanhed");
    };
    ModalAddFoodComponent.prototype.selectImage = function () {
        var _this = this;
        this.permissions.hasPermission(this.permissions.READ_EXTERNAL_STORAGE, function (status) {
            if (!status.hasPermission) {
                _this.permissions.requestPermission(_this.permissions.READ_EXTERNAL_STORAGE, function (status) {
                    console.log("status: " + status);
                    if (status.hasPermission) {
                        _this.chooseImage();
                    }
                    // if(!status.hasPermission) errorCallback();
                }, function (err) {
                    console.log("ERROR: " + err);
                });
            }
            else {
                _this.chooseImage();
            }
        }, function () { console.log("PERMISSION ERROR"); });
    };
    ModalAddFoodComponent.prototype.chooseImage = function () {
        var _this = this;
        FileChooser.open()
            .then(function (uri) {
            // FilePath.resolveNativePath(uri)
            // .then(filePath => console.log("filePath from FilePath: " + filePath))
            // .catch(err => console.log(err));
            var uripath = "" + uri;
            window.FilePath.resolveNativePath(uripath, function (url) {
                console.log("FilePath From window.FilePath : " + url);
                _this.img_url = url;
                _this.extractImage("" + url);
            }, function (err) {
                console.log("FUCKING ERROR: " + err);
            });
        }).catch(function (e) { return console.log(e); });
    };
    ModalAddFoodComponent.prototype.extractImage = function (url) {
        var _this = this;
        var l = url.split("/");
        var fileName = l[l.length - 1];
        var path = url.replace(fileName, "");
        console.log("fileName: " + fileName + "\n" + "path: " + path);
        File.readAsBinaryString(path, fileName)
            .then(function (data) {
            _this.image = {
                title: fileName,
                data: data,
            };
        })
            .catch(function (err) { return console.log("ERROR: " + err); });
    };
    ModalAddFoodComponent.prototype.newFood = function () {
        var _this = this;
        this.orderService.createFood(this.food, this.image)
            .subscribe(function (res) {
            // console.log(res);
            // this.toast(res.title + "was created");
            // console.log("new food: " + this.food.type._id);
            _this.viewCtlr.dismiss(_this.food.type._id);
        }, function (err) {
            _this.toast(err);
            _this.viewCtlr.dismiss();
        });
    };
    ModalAddFoodComponent.prototype.getToppings = function () {
        var _this = this;
        this.orderService.getTopping().subscribe(function (toppings) {
            _this.toppings = toppings;
        }, function (err) {
            _this.toast(err);
        });
    };
    ModalAddFoodComponent.prototype.addToppingToFood = function (topping) {
        this.food.toppings.push(topping);
    };
    return ModalAddFoodComponent;
}());
ModalAddFoodComponent = __decorate([
    Component({
        selector: 'modal-add-food',
        templateUrl: 'modal-add-food.html',
        providers: [OrderService]
    }),
    __metadata("design:paramtypes", [NavController,
        ViewController,
        ModalController,
        ToastController,
        NavParams,
        OrderService])
], ModalAddFoodComponent);
export { ModalAddFoodComponent };
//# sourceMappingURL=modal-add-food.js.map