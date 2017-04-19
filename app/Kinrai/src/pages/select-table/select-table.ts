import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';

import { OrderService } from '../../providers/order-service';
/*
  Generated class for the SelectTable page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-select-table',
  	templateUrl: 'select-table.html',
    providers: [OrderService]
  })
  export class SelectTablePage {
  	tableZones: any;
  	constructor(
      private orderService: OrderService,
  		public viewCtrl: ViewController,
  		public navCtrl: NavController, 
  		public navParams: NavParams
  		) 
    {
      this.tableZones = [];
      this.getTable();
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SelectTablePage');
    }

    select(zone, table){
      this.viewCtrl.dismiss({zone: zone, table: table});
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

  }
