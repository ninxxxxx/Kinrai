import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

import { OrderService } from '../../providers/order-service';
import { UtilsService } from '../../providers/utils-service';

import { BaseChartDirective } from 'ng2-charts/ng2-charts'; 

/*
  Generated class for the SaleHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-sale-history',
  	templateUrl: 'sale-history.html',
    providers: [OrderService]
  })
  export class SaleHistoryPage {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;
    public currentTab;
    public currentDate;

    public lineChartData:Array<any> = [
    {data: [650, 590, 800, 810, 560, 550, 200], label: 'Series A'},
    // {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
    // {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];
    // public lineChartLabels:Array<any> = [];
    public lineChartLabels:Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
    public lineChartOptions:any = {
      responsive: true
    };
    public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    
    ];
    public lineChartLegend:boolean = false;
    public lineChartType:string = 'line';



    constructor(
      private orderService: OrderService,
      public navCtrl: NavController, 
      public navParams: NavParams,
      private datePicker: DatePicker,
      ) 
    {
      this.currentDate = new Date();
      this.currentTab = "day";
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SaleHistoryPage');
    }

    openDatePicker(){
      this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
      }).then(
      date => {
        this.currentDate = date
      },
      err => console.log('Error occurred while getting date: ', err)
      );
    }

    changeTab(time){
      this.currentTab = time;
    } 
    // chooseSaleByDate(date){

      // }

    }
