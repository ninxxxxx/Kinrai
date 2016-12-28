import { Component } from '@angular/core';
import { NavController, ViewController} from 'ionic-angular';
/*
  Generated class for the ModalAddOption component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'modal-add-option',
  templateUrl: 'modal-add-option.html'
})
export class ModalAddOptionComponent {

    title: string;
    option: string;
    options: Array<string> = [];
    constructor(public navCtrl: NavController, public viewCtrl: ViewController) {

    }

    ionViewDidLoad() {
      console.log('Hello ModalNewOptionPage Page');
    }
    addOption(option){
      console
      this.options.push(option);
      this.option = "";
    }
    cancel(){
      this.viewCtrl.dismiss();
    }

}
