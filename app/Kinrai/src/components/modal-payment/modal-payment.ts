import { Component } from '@angular/core';
import {  NavParams} from 'ionic-angular';


import { OrderService } from '../../providers/order-service';
/*
  Generated class for the ModalPayment component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
    */
  @Component({
    selector: 'modal-payment',
    templateUrl: 'modal-payment.html',
    providers:[OrderService]
  })
  export class ModalPaymentComponent {
    bills: any;
    tableNumber: string;
    constructor(
      private orderService: OrderService,
      public navParams: NavParams
      ) 
    {
      this.tableNumber = this.navParams.get('tableNumber');
      this.bills = [];
      this.getBillsFromTable();
    }

    getBillsFromTable(){
      this.orderService.getBillsFromTable(this.tableNumber).subscribe(
        bills =>{
          this.bills = bills;
        },
        err =>{
          console.log(err);
        }
        )
    }
  }
