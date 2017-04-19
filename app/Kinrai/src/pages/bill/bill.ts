import { Component } from '@angular/core';
import { ToastController, ViewController, NavController, NavParams, ModalController } from 'ionic-angular';

import { ModalPaymentComponent } from '../../components/modal-payment/modal-payment';
import { OrderService } from '../../providers/order-service';
/*
  Generated class for the Bill page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  declare var io;


  @Component({
  	selector: 'page-bill',
  	templateUrl: 'bill.html',
  	providers:[OrderService]
  })
  export class BillPage {

    d: any;
  	currentView: string;
  	bills: any;
  	tableNumbers: any;
    untitledBills: any;
    tableZones: any;
    
    socket: any;
    server: string;

    constructor(
      public toastCtrl: ToastController, 
      public viewCtrl: ViewController, 
      public modalCtrl: ModalController, 
      private orderService: OrderService, 
      public navCtrl: NavController, 
      public navParams: NavParams
      ) 
    {

      // let r = ["1", "3", "ff", "ffd"];
      // console.log("is 1 included in r ? : " + (r.indexOf("rrr") > -1 ? "yes" : "no"));
      this.d = [];
      this.server = this.orderService.getServer();
      this.tableZones = [];
      this.currentView = "table";
      this.bills = [];
      this.tableNumbers = [];
      this.untitledBills = [];

      this.initGet();
      // this.gg();

      this.socket = io(this.orderService.server);
      this.socket.on('bills changed', (msgs)=>{
        console.log("bills has changed");
        this.initGet();
      });

      this.socket.on('check lock bill', (msgs)=>{
        let j = JSON.parse(msgs);
        // console.log(j);
        if(j.m.localeCompare("unlock") == 0){
          setTimeout(()=>{
            this.socket.emit('lock table', JSON.stringify({t:j.t, i:j.i}));
            let modal = this.modalCtrl.create(ModalPaymentComponent, {tableNumber: j.t, bill_id: j.i});
            modal.present();
          }, 250);
        }else{
          this.toast("This table is in process");
        }
      });



    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad BillPage');
    }


    initGet(){
      this.getTableNumbers();
      this.getIndividualBill();
      this.getTable();

      

    }
    // gg(){
    //   BLE.startScan([]).subscribe(
    //     res=>{
    //       console.log("...");
    //       this.d.push(res);
    //       console.log(res);
    //     },
    //     err=>{

    //     }
    //   );
    // }

    getIndividualBill(){
      this.orderService.getUntitledBills().subscribe(
        bills =>{
          this.untitledBills = bills;
        },
        err =>{
          console.log(err);
        }
        )
    }

    getTableNumbers(){
      this.orderService.getTableNumbers().subscribe(
        bills =>{
          this.bills = bills;
          console.log("bills", this.bills);
          },
          err =>{
            console.log(err);
          }
          )
    }

    openPaymentModal(tableNumber, billId){

      this.socket.emit("check lock bill", JSON.stringify({table_number: tableNumber, bill_id: billId}));
      // console.log("check: " + check);
      
    }

    toast(messages){
      let toast = this.toastCtrl.create({
        message: messages,
        duration: 500
      });
      toast.present();
    }


    getTable(){
      this.orderService.getTable().subscribe(
        tableZones =>{
          this.tableZones = tableZones;
          // this.allTable = tableZone ? tableZone : [];
        },
        err =>{
          console.log(err);
        }

        );
    }

    isIn(zone, table){
      // console.log(this.bills);
      // console.log(zone, table);
      let t = JSON.stringify({zone: zone, table: table});
      let index = this.bills.map(tableZone =>{return JSON.stringify(tableZone);}).indexOf(t);
      return index > -1 ? true : false;
    }
  }
