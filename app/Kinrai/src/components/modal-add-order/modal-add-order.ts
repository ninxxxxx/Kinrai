import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
/*
  Generated class for the ModalAddOrder component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
    */
  @Component({
    selector: 'modal-add-order',
    templateUrl: 'modal-add-order.html'
  })
  export class ModalAddOrderComponent {

    constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
    }

    cancel(){
      this.viewCtrl.dismiss();
    }



  }
