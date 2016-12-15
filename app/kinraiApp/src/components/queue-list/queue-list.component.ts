import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { reorderArray, ToastController } from 'ionic-angular';
import { FilePath, FileChooser } from 'ionic-native';


import { OrderService } from '../../providers/order-service/order.service';

/*
  Generated class for the QueueList component.

  See https://angular.io/docs/ts/latest/api/core/ComponentMetadata-class.html
  for more info on Angular 2 Components.
  	*/
  declare var cordova:any;
  declare var window:any;
  @Component({
  	selector: 'queue-list',
  	templateUrl: 'queue-list.html',
    providers:[OrderService]

  })
  export class QueueList implements OnInit{


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
    
    constructor(private orderService: OrderService, public toastCtrl: ToastController) {
      document.addEventListener('deviceready', ()=>{
        console.log("Device is Ready: window.Permissions");
        this.permissionss = cordova.plugins.permissions;  
        // console.log("" + this.permissions + " " + this.permissionss + " " + this.permissionsss);
        // if(this.permissions == undefined) console.log("Permission is Undefined :("); 
      });
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



          // console.log("URI:   " + uri);
          // console.log("URI Decode:   " + decodeURI(uri));
          // FilePath.resolveNativePath(uri).then(filePath => console.log("filePath: " + filePath)).catch(err => console.log(err));


          b(){

            FileChooser.open()
            .then(uri => {
              console.log("PLEASE ATOM");
              // console.log("" + cordova.file.dataDirectory);
              let uripath = "" + uri;

              window.FilePath.resolveNativePath(uripath,
                url =>{
                  console.log("I GOT FILE PATH !! : " + url);
                  this.img_url = url;
                },
                err =>{
                  console.log("FUCKING ERROR: " + err);
                }
                );
            }).catch(e => console.log(e));   

          }

          bb(){

            this.permissionss.hasPermission(this.permissionss.READ_EXTERNAL_STORAGE,
              status => {
                this.checkPermissionCallback(status);
                FileChooser.open()
                .then(uri => 
                {
                  FilePath.resolveNativePath(uri)
                  .then(filePath => console.log("filePath from FilePath: " + filePath))
                  .catch(err => console.log(err));

                  let uripath = "" + uri;

                  window.FilePath.resolveNativePath(uripath,
                    url =>{
                      console.log("FilePath From window.FilePath : " + url);
                      this.img_url = url;
                    },
                    err =>{
                      console.log("FUCKING ERROR: " + err);
                    }
                    );
                }).catch(e => console.log(e));       
              },
              () => {console.log("PERMISSION ERROR")}
              );

          }

          checkPermissionCallback(status){
            if(!status.hasPermission){
              let errorCallback = function(){
                console.warn('External Reading is turn off');
              }
              this.permissionss.requestPermission(this.permissionss.READ_EXTERNAL_STORAGE,
                status =>{
                  if(!status.hasPermission) errorCallback();
                },
                errorCallback
                );
            }
          }







          createOrder(food){
            this.orderService.createOrder(food).subscribe(
              res => {
                console.log(res);
                this.toast(res)
              },
              err =>{
                this.toast("Error : " + err);
              },
              () =>{
                console.log("DONE")
              }
              );

          }



          
          createFood(){
            this.orderService.createFood().subscribe(
              res => {
                console.log("RES: " + res);
                this.toast(res);

              },
              err =>{
                this.toast("Error : " + err);
              },
              () =>{
                console.log("DONE")
              }

              )
          }

          getOrders(){
            this.orderService.getOrders().subscribe(
              data =>{
                if(data != ""){
                  this.orders = data;
                  console.log("food from server : " + this.orders);
                  this.toast("Got Orders");
                }else{
                  this.orders = null;
                  this.toast("Empty")
                }
              },
              err =>{
                console.log("Error : " + err);
                this.toast("" + err);
              },
              () => {
                console.log("Get Food's list is Completed");
              }
              );
          }
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


                              }