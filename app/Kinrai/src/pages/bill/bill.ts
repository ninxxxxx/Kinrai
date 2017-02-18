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

  	currentView: string;
  	bills: any;
  	tableNumbers: any;
    untitledBills: any;

    socket: any;
    constructor(public toastCtrl: ToastController, public viewCtrl: ViewController, public modalCtrl: ModalController, private orderService: OrderService, public navCtrl: NavController, public navParams: NavParams) {
      this.currentView = "table";
      this.bills = [];
      this.tableNumbers = [];
      this.untitledBills = [];
      this.getTableNumbers();
      this.getIndividualBill();


      this.socket = io(this.orderService.server);
      this.socket.on('bills changed', (msgs)=>{
        console.log("bills has changed");
        this.getTableNumbers();
        this.getIndividualBill();
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

          let row = Math.floor(bills.length/3) + 1;
          // let i = 0;

          this.tableNumbers = [];
          for(let i = 0; i < row; i++){
            let sub = [];
            for(let j = 0; j < 3; j++){
              if(this.bills[j + (i * 3)])
                sub.push(this.bills[j + (i * 3)]);
            }
            this.tableNumbers.push(sub);
          }
          console.log(this.tableNumbers);
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


  }
