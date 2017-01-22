import { Component } from '@angular/core';
import { NavController, ViewController} from 'ionic-angular';

import { OrderService } from '../../providers/order-service';



/*
  Generated class for the ModalAddOption component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
    */



  @Component({
    selector: 'modal-add-option',
    templateUrl: 'modal-add-option.html',
    providers: [OrderService]
  })
  export class ModalAddOptionComponent {

    title: string;
    option: any;
    options: Array<any> = [];
    toppings: any;
    constructor(private orderService: OrderService, public navCtrl: NavController, public viewCtrl: ViewController) {
      this.option = {
        title: "",
        price: ""
      }
    }

    ionViewDidLoad() {
      console.log('Hello ModalNewOptionPage Page');
    }
    addOption(option){
      this.options.push(option);
      this.option = {title: "", price: ""};
    }

    removeTop(top){
      let index = this.options.map(option=>{return option.title}).indexOf(top.title);
      this.options.splice(index, 1);
    }

    newTopping(){
      let topping = {
        title: this.title,
        tops: this.options
      }
      this.orderService.newTopping(topping).subscribe(
        toppings =>{
          console.log("save ?");
          this.toppings = toppings;
          this.viewCtrl.dismiss(this.toppings);
        },
        err =>{
          console.log(err);
        }
        );
      // console.log("in modal");
      // console.log(this.toppings);
    }
    cancel(){
      this.viewCtrl.dismiss();
    }
  }
