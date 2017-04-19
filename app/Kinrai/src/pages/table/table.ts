import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';


import { OrderService } from '../../providers/order-service';
/*
  Generated class for the Table page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-table',
  	templateUrl: 'table.html',
    providers: [OrderService]
  })
  export class TablePage {

  	allTable: any;
  	constructor(
      public alertCtrl: AlertController,
      private orderService: OrderService,
      public navCtrl: NavController, 
      public navParams: NavParams
      ) {

  		this.allTable = [];
      this.getTable();
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad TablePage');
    }

    getTable(){
      this.orderService.getTable().subscribe(
        tableZone =>{
          this.allTable = tableZone ? tableZone : [];
        },
        err =>{
          console.log(err);
        }

        );
    }
    newTableZone(){
      let prompt = this.alertCtrl.create({
        title: 'New TableZone',
        message: "Enter zone's title and total table on this zone",
        inputs: [
        {
          name: 'zone',
          placeholder: 'Title'
        },
        {
          name: 'total',
          placeholder: 'total table'
        }
        ],
        buttons: [
        {
          text: 'Cancel',
          handler: data => {
            // console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            let tables = [];
            for(let i=0; i < data.total; i++){
              tables.push((i+1) + "");
              // console.log((i+1) + "")
            }
            this.orderService.newTableZone(data.zone, tables).subscribe(
              res =>{
                console.log(res);
                this.getTable();   
              },
              err =>{
                console.log(err);
              }

              );
          }
        }
        ]
      });
      prompt.present();
    }
  }
