import { Component } from '@angular/core';
import { ToastController, AlertController, ViewController, NavParams } from 'ionic-angular';


import { OrderService } from '../../providers/order-service';
/*
  Generated class for the ModalPayment component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
    */
  declare var io;

  @Component({
    selector: 'modal-payment',
    templateUrl: 'modal-payment.html',
    providers:[OrderService]
  })
  export class ModalPaymentComponent {
    bills: any;
    tableNumber: string;
    billId: string;
    totalPrice: number;
    change: number;
    recvMoney: number;

    socket: any;
    constructor(
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
      private viewCtrl: ViewController,
      private orderService: OrderService,
      public navParams: NavParams
      ) 
    {
      // this.recvMoney = ;
      this.change = 0;
      this.totalPrice = 0;
      this.tableNumber = this.navParams.get('tableNumber');
      this.billId = this.navParams.get('bill_id');
      this.bills = [];
      if(this.tableNumber)
        this.getBillsFromTable();
      if(this.billId)
        this.getBillFromId();



      this.socket = io(this.orderService.server);
      this.socket.on('bills changed', (msgs)=>{
        console.log("bills has changed");
        this.getBillsFromTable();
        // this.zone.run(()=>{
          //       this.toast("Messages: " + msgs);
          //     });
        });
    }


    getBillFromId(){
      this.orderService.getBillFromId(this.billId).subscribe(
        bill =>{
          this.bills = [bill];
          this.totalPrice = bill.total_price;
        },
        err =>{
          console.log(err);
        }
        )
    }

    getBillsFromTable(){
      this.orderService.getBillsFromTable(this.tableNumber).subscribe(
        bills =>{
          console.log(bills);
          this.bills = bills;
          this.sumBillPrice();
        },
        err =>{
          console.log(err);
        }
        )
    }
    cancel(){
      setTimeout(()=>{
        this.socket.emit("unlock table", JSON.stringify({t: this.tableNumber, i: this.billId}));
        this.viewCtrl.dismiss();
      }, 250);
    }

    sumBillPrice(){
      this.bills.forEach(bill =>{this.totalPrice += bill.total_price});
    }


    confirmAlert(){
      let alert = this.alertCtrl.create({
        title: "Check Bill ?",
        message: "Are you sure to check this bill ?",
        buttons:[
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.checkBill();
            // console.log('checked bill clicked');
          }
        }
        ]
      });
      alert.present();
    }
    checkBill(){
      let bill_ids = [];
      this.bills.map(bill =>{bill_ids.push(bill._id)});
      console.log(bill_ids);
      this.orderService.checkBill(bill_ids).subscribe(
        res =>{
          this.toast(res);
          console.log(res);
        },
        err =>{
          console.log(err);
        }
        );
      setTimeout(()=>{
        this.socket.emit("bills changed", "...");
        this.socket.emit("unlock table", JSON.stringify({t: this.tableNumber, i: this.billId}));
        this.viewCtrl.dismiss();
      },250);
    }

    toast(messages){
      let toast = this.toastCtrl.create({
        message: messages,
        duration: 500
      });
      toast.present();
    }
  }
