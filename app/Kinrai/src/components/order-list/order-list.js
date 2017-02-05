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
import { ToastController, ModalController } from 'ionic-angular';
import { OrderService } from '../../providers/order-service';
import { ModalAddFoodComponent } from '../modal-add-food/modal-add-food';
var OrderListComponent = (function () {
    function OrderListComponent(orderService, toastCtrl, modalCtrl) {
        this.orderService = orderService;
        this.toastCtrl = toastCtrl;
        this.modalCtrl = modalCtrl;
    }
    OrderListComponent.prototype.ngOnInit = function () {
        console.log("QueueList now created");
        // this.toast("i'm Toast");
        // console.log("OnInit");
        // this.getOrders();   
    };
    // ngOnChanges() {
    //     // this.changeWaitTime();  
    //   }
    OrderListComponent.prototype.toast = function (messages) {
        var toast = this.toastCtrl.create({
            message: messages,
            duration: 3000
        });
        toast.present();
    };
    // doRefresh(refresher){
    //   console.log('Begin async operation', refresher);
    //   setTimeout(() => {
    //     console.log('Async operation has ended');
    //     refresher.complete();
    //   }, 2000);
    // }
    //=================================================
    // changeWaitTime(){
    //   this.totalWaitTime = 0;
    //   for(let i in this.queues){
    //     this.totalWaitTime += this.queues[i].estTime;
    //     this.queues[i].waitTime = 0;
    //     this.queues[i].waitTime = this.totalWaitTime;
    //   }
    //   this.waitTime.emit(this.totalWaitTime);
    // }
    //==================================================
    OrderListComponent.prototype.toggleDetails = function (order) {
        console.log("toggle!");
        if (this.isToggle != order.food.title) {
            this.isToggle = order.food.title;
        }
        else {
            this.isToggle = "";
        }
        //===============================================
        // console.log("PREV_order" + this.prevOrder);
        // console.log("CUR_order" + order);
        // let index = this.orders.indexOf(order);
        // if(index > -1){
        //   this.orders[index].isToggle  = !this.orders[index].isToggle;  
        //   if(this.prevOrder != null){
        //     if(JSON.stringify(this.orders[index]) != JSON.stringify(this.prevOrder)){
        //       let prevIndex = this.orders.indexOf(this.prevOrder);
        //       if(this.orders[prevIndex].isToggle){
        //         this.orders[prevIndex].isToggle = !this.orders[prevIndex].isToggle;
        //       }
        //     }
        //   }
        //   this.prevOrder = order;
        // }
    };
    //===================================================
    // toggleReOrder(){
    //   this.isRe = !this.isRe;
    // }
    //===================================================
    // deleteQueue(queue){
    //   let index = this.queues.indexOf(queue);
    //   if(index > -1){
    //     if(JSON.stringify(this.queues[index]) == JSON.stringify(this.prevQueue)){
    //       this.prevQueue = null;
    //     }
    //     this.queues.splice(index, 1);
    //   }
    //   // this.changeWaitTime();
    // }
    // reOrderQueues(indexes){
    //   this.queues = reorderArray(this.queues, indexes);
    //   // this.changeWaitTime();
    // }
    OrderListComponent.prototype.showModalAddFood = function () {
        var modal = this.modalCtrl.create(ModalAddFoodComponent);
        modal.present();
    };
    return OrderListComponent;
}());
OrderListComponent = __decorate([
    Component({
        selector: 'order-list',
        templateUrl: 'order-list.html',
        providers: [OrderService]
    }),
    __metadata("design:paramtypes", [OrderService,
        ToastController,
        ModalController])
], OrderListComponent);
export { OrderListComponent };
//# sourceMappingURL=order-list.js.map