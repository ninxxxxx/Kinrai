import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';

import { BaseChartDirective } from 'ng2-charts/ng2-charts'; 

import { OrderService } from '../../providers/order-service';
import { UtilsService } from '../../providers/utils-service';

import { FoodRanking } from '../../pages/food-ranking/food-ranking';
/*
  Generated class for the SaleHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-sale-history',
  	templateUrl: 'sale-history.html',
    // providers: [OrderService]
  })
  export class SaleHistoryPage {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    public data: Array<any>;
    public labels: Array<any>;


    public lineChartOptions:any = {
      responsive: true
    };

    public lineChartLegend:boolean = false;
    public lineChartType:string = 'line';
    
    public currentTab;
    public currentDate;

    total_price: number = 0;
    ranking: Array<any> = [{title:[""]}, {title:[""]}, {title:[""]}];
    constructor(
      private orderService: OrderService,
      public navCtrl: NavController, 
      public navParams: NavParams,
      private datePicker: DatePicker,
      public loadCtrl: LoadingController
      ) 
    {
      this.data = [0, 1, 2, 3];
      this.labels = ["0", "1", "2", "3"];
      this.currentDate = new Date();
      this.currentTab = "day";
      this.chooseSaleByDate(this.currentDate);  
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad SaleHistoryPage');
    }

    openDatePicker(){
      this.datePicker.show({
        date: new Date(),
        mode: 'date',
        androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
      }).then(
      date => {
        this.currentDate = date
        this.chooseSaleByDate(date);
      },
      err => console.log('Error occurred while getting date: ', err)
      );
    }

    changeTab(time){
      this.currentTab = time;
    } 
    
    chooseSaleByDate(date){
      this.orderService.getShOfDay(date).subscribe(
        salesHistory=>{
          console.log("data is loaded", salesHistory);
          let graphData = salesHistory.salesPerHour;
          let summary = salesHistory.summary[0];
          
          let data = [];
          let labels = [];

          if(summary){
            graphData.map(pot=>{
              pot.hours = ((pot.hours + 7) % 24);
            })
            graphData.sort((a, b)=> {return a.hours - b.hours});
            graphData.map(pot=>{
              data.push(pot.sale);
              labels.push(pot.hours);
            })
            this.data = data;
            this.labels = labels;
            this.total_price = summary.total_sales;
            this.ranking = salesHistory.foodRanking;
            console.log(salesHistory.foodRanking);
          }
          else{
            this.data = [0];
            this.labels = [0];
            this.total_price = 0;
            this.ranking = [{title:[""]}, {title:[""]}, {title:[""]}];
          }
          this.chart.ngOnChanges({});
          setTimeout(()=>{
            this.chart.ngOnChanges({});
          },250)
        })
    }

    openFoodRanking(){
      this.navCtrl.push(FoodRanking, {foodRank: this.ranking});
    }
  }
