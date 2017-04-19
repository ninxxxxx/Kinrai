import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
/*
  Generated class for the SaleHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-sale-history',
  	templateUrl: 'sale-history.html'
  })
  export class SaleHistoryPage {

  	constructor(
      public navCtrl: NavController, 
      public navParams: NavParams,
  		private datePicker: DatePicker,
  		) 
  	{

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
  		date => console.log('Got date: ', date),
  		err => console.log('Error occurred while getting date: ', err)
  		);
  	}
  }
