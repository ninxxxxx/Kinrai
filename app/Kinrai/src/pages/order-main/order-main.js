var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, NgZone, ViewChild } from '@angular/core';
import { ToastController, NavController, ModalController, ViewController, Select } from 'ionic-angular';
import { ModalAddOrderComponent } from '../../components/modal-add-order/modal-add-order';
import { ModalAddFoodComponent } from '../../components/modal-add-food/modal-add-food';
import { OrderService } from '../../providers/order-service';
// declare var window:any;
var OrderMainPage = (function () {
    function OrderMainPage(zone, orderService, toastCtrl, navCtrl, modalCtrl, viewCtrl) {
        var _this = this;
        this.zone = zone;
        this.orderService = orderService;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.modalCtrl = modalCtrl;
        this.viewCtrl = viewCtrl;
        this.isRe = false;
        this.isToggle = true;
        this.categories = [];
        this.chosenCats = [];
        this.chosenCatsTxt = "All Category";
        this.countdown = 5;
        this.status = "waiting";
        this.orders = [];
        this.getFullCategories();
        this.getOrders();
        // this.countDown();
        // =======================================================================
        this.socket = io(this.orderService.server);
        this.socket.on('orders changed', function (msgs) {
            console.log("orders has changed");
            _this.getOrders();
            // this.zone.run(()=>{
            //       this.toast("Messages: " + msgs);
            //     });
        });
    }
    OrderMainPage.prototype.ionViewDidLoad = function () {
        // console.log('ionViewDidLoad OrderMainPage');
    };
    OrderMainPage.prototype.getFullCategories = function () {
        var _this = this;
        this.orderService.getFullCategories().subscribe(function (res) {
            _this.categories = res;
        }, function (err) {
            console.log(err);
        });
    };
    OrderMainPage.prototype.getOrders = function () {
        var _this = this;
        this.orderService.getOrders().subscribe(function (res) {
            _this.orders = res;
        }, function (err) {
            _this.toast(err);
        });
    };
    OrderMainPage.prototype.emitHello = function () {
        this.socket.emit('hello', "Hello from the client side");
    };
    OrderMainPage.prototype.showAddQueueModal = function () {
        var modal = this.modalCtrl.create(ModalAddOrderComponent);
        modal.present();
    };
    OrderMainPage.prototype.showCreateFoodModal = function () {
        var modal = this.modalCtrl.create(ModalAddFoodComponent);
        modal.present();
    };
    OrderMainPage.prototype.toast = function (messages) {
        var toast = this.toastCtrl.create({
            message: messages,
            duration: 3000
        });
        toast.present();
    };
    OrderMainPage.prototype.setDone = function (order_id) {
        var _this = this;
        var indx = this.orders.map(function (order) { return order._id; }).indexOf(order_id);
        this.orders[indx].status = 'done';
        this.counter = setInterval(function () {
            _this.countdown--;
            if (_this.countdown == 0) {
                _this.countdown = 5;
                clearInterval(_this.counter);
                _this.changeOrderStatus(order_id, 'done');
            }
        }, 1000);
    };
    OrderMainPage.prototype.changeOrderStatus = function (order_id, status) {
        var _this = this;
        if (status == "waiting") {
            this.countdown = 5;
            clearInterval(this.counter);
        }
        this.orderService.changeOrderStatus(order_id, status).subscribe(function (res) {
            // this.toast(res);
            console.log(res);
            setTimeout(function () {
                _this.socket.emit('orders changed', "some order's status has changed.");
            }, 500);
        }, function (err) {
            _this.toast(err);
        });
    };
    OrderMainPage.prototype.chooseCats = function () {
        this.getFullCategories();
        this.catsSelect.open();
    };
    OrderMainPage.prototype.getOrderByFilter = function () {
        var _this = this;
        this.chosenCatsTxt = "";
        console.log(this.chosenCats.length + " " + this.categories.length);
        if (this.chosenCats.length != this.categories.length) {
            this.chosenCats.map(function (cat) {
                _this.chosenCatsTxt += cat.title + "/";
            });
        }
        else {
            this.chosenCatsTxt = "All Category";
        }
        var chosenCatsId = [];
        this.chosenCats.forEach(function (cat) { chosenCatsId.push(cat._id); });
        this.orderService.getOrderByFilter(chosenCatsId).subscribe(function (res) {
            console.log(res);
            _this.categories = res;
        }, function (err) {
            console.log(err);
        });
    };
    return OrderMainPage;
}());
__decorate([
    ViewChild('catsSelect'),
    __metadata("design:type", Select)
], OrderMainPage.prototype, "catsSelect", void 0);
OrderMainPage = __decorate([
    Component({
        selector: 'page-order-main',
        templateUrl: 'order-main.html',
        providers: [OrderService]
    }),
    __metadata("design:paramtypes", [NgZone,
        OrderService,
        ToastController,
        NavController,
        ModalController,
        ViewController])
], OrderMainPage);
export { OrderMainPage };
//# sourceMappingURL=order-main.js.map