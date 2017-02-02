import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { reorderArray, ToastController, ModalController } from 'ionic-angular';
import { FilePath, FileChooser } from 'ionic-native';


import {  OrderService } from '../../providers/order-service';
import { ModalAddFoodComponent } from '../modal-add-food/modal-add-food';
/*
  Generated class for the OrderList component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
    */
  declare var cordova:any;
  declare var window:any;
  @Component({
    selector: 'order-list',
    templateUrl: 'order-list.html',
    providers:[OrderService]
  })

  export class OrderListComponent implements OnInit{


    // @Input() queues: any;
    // @Output() waitTime: EventEmitter<number> = new EventEmitter<number>();
    // permissions = window.Permissions;
    permissionss: any;    

    totalWaitTime: number;
    prevOrder: any;
    orders: any;
    isRe: boolean;
    isToggle: string;

    img_url: string;

    constructor(
      private orderService: OrderService, 
      public toastCtrl: ToastController,
      public modalCtrl: ModalController
      ) {
      
    }

    ngOnInit(){
      console.log("QueueList now created");
      // this.toast("i'm Toast");
      // console.log("OnInit");
      // this.getOrders();   
    }

    // ngOnChanges() {
      //     // this.changeWaitTime();  
      //   }

      toast(messages){
        let toast = this.toastCtrl.create({
          message: messages,
          duration: 3000
        });
        toast.present();
      }

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
          toggleDetails(order){
            console.log("toggle!");
            if(this.isToggle != order.food.title)
            {
              this.isToggle = order.food.title;
            }else{
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
                  }
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

                            showModalAddFood(){
                              let modal = this.modalCtrl.create(ModalAddFoodComponent)
                              modal.present();
                            }  

                          }
