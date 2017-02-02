import { Component, NgZone } from '@angular/core';
import { ToastController, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';




import { ModalAddOrderComponent } from '../../components/modal-add-order/modal-add-order';
import { ModalAddFoodComponent } from '../../components/modal-add-food/modal-add-food';
import { OrderService } from '../../providers/order-service';

declare var io;
declare var cordova:any;
// declare var window:any;

@Component({
  selector: 'page-order-main',
  templateUrl: 'order-main.html',
  providers: [OrderService]
})
export class OrderMainPage {

  isRe:boolean = false;
  isToggle:boolean = true;
  countt: number;
  prevQueue:any;
  queues:any;

  status: any;
  orders: any;

  totalWaitTime:number = 0;
  socket: any;
  constructor(
    private zone: NgZone,
    private orderService: OrderService,
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController
    ) {
    this.status = "waiting";   
    this.orders = [];
    this.getOrder(this.status);
    this.countDown(); 

    // =======================================================================
    this.socket = io(this.orderService.server);
    // this.socket.emit('hello', "...");
    this.socket.on('hello', (msgs)=>{
      this.zone.run(()=>{
        this.toast("Messages: " + msgs);
      });
    });
    this.socket.on('orders changed', (msgs)=>{
      this.getOrder(this.status);
      // this.zone.run(()=>{
        //     this.toast("Messages: " + msgs);
        //   });
      });
  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderMainPage');
  }

  getOrder(status){
    this.orderService.getOrders(status).subscribe(
      res =>{
        this.orders = res;
        this.countDown();
      },
      err =>{
        this.toast(err);
      }

      );

  }


  emitHello(){
    this.socket.emit('hello', "Hello from the client side");
  }

  showAddQueueModal(){
    let modal = this.modalCtrl.create(ModalAddOrderComponent);
    modal.present();
  }

  showCreateFoodModal(){
    let modal = this.modalCtrl.create(ModalAddFoodComponent);
    modal.present();
  }    

  toast(messages){
    let toast = this.toastCtrl.create({
      message: messages,
      duration: 3000
    });
    toast.present();
  }

  changeWT(value: number){
    this.totalWaitTime = value;
  }

  countDown(){
    let totalTime = 0;
    let now = new Date();
    if(this.orders){
      this.orders.forEach(order =>{
        let createTime = new Date(order.date);
        // let diffHours = now.getHours() - createTime.getHours() - 7;
        let diffMins = now.getMinutes() - createTime.getMinutes();
        totalTime += order.food.estimate_time;
        // console.log(diffHours);
        console.log(diffMins);
        console.log(totalTime);

        order.wait_time = totalTime - diffMins;
        if(order.wait_time < 0) {
          totalTime -= order.food.estimate_time;
          order.wait_time = 0;
        }
      });
    }
    setInterval(()=>{
      let totalTime = 0;
      let now = new Date();
      if(this.orders){
        this.orders.forEach(order =>{
          let createTime = new Date(order.date);
          // let diffHours = now.getHours() - createTime.getHours() - 7;
          let diffMins = now.getMinutes() - createTime.getMinutes();
          totalTime += order.food.estimate_time;
          // console.log(diffHours);
          console.log(diffMins);
          console.log(totalTime);

          order.wait_time = totalTime - diffMins;
          if(order.wait_time < 0) order.wait_time = 0;
        });
      }
    }, 60000);
  }
}
