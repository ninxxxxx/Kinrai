
import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ModalController, ToastController} from 'ionic-angular';
import { File, FilePath, FileChooser } from 'ionic-native';

import {  OrderService } from '../../providers/order-service';
import { ModalAddOptionComponent } from '../modal-add-option/modal-add-option';
/*
  Generated class for the ModalAddFood component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
    */
  declare var cordova:any;
  declare var window:any;
  @Component({
    selector: 'modal-add-food',
    templateUrl: 'modal-add-food.html',
    providers: [OrderService]
  })
  export class ModalAddFoodComponent {

    permissions: any;
    img_url: string;
    food: any;

    categories: Array<any>;
    currentCategory: any;
    currentType: any;
    
    selectCat: any;
    selectType: any;
    image: any;
    options: Array<any>;  
    selectedOptions: Array<any>;
    toppings: Array<any>;

    constructor(
      public navCtrl: NavController, 
      private viewCtlr: ViewController, 
      public modalCtrl: ModalController,
      public toastCtrl: ToastController,
      public navParams: NavParams, 
      private orderService: OrderService,
      ) 
    {

      this.currentCategory = this.navParams.get('category');

      this.currentType = this.navParams.get('currentType');

      this.getToppings();

      this.food = {
        title: "",
        price: 0,
        type: this.currentType,
        category: this.currentCategory,
        estimate_time: 0,
        img_url: "",
        ordered_count: 0,
        toppings: [],
      };


      document.addEventListener('deviceready', ()=>{
        console.log("Device is Ready: window.Permissions");
        this.permissions = cordova.plugins.permissions;  
      });
    }

    openNewOption(){
      let modal = this.modalCtrl.create(ModalAddOptionComponent);
      modal.present();
    }

    cancel(){
      this.viewCtlr.dismiss();
    }

    toast(messages){
      let toast = this.toastCtrl.create({
        message: messages,
        duration: 3000
      });
      toast.present();
    }

    changeCurCat(category){
      this.currentCategory = category;
      console.log("cat chanhed");
    }



    selectImage(){

      this.permissions.hasPermission(this.permissions.READ_EXTERNAL_STORAGE,
        status => {
          if(!status.hasPermission){
            this.permissions.requestPermission(this.permissions.READ_EXTERNAL_STORAGE,
              status =>{
                console.log("status: " + status);
                if(status.hasPermission){
                  this.chooseImage();
                }
                // if(!status.hasPermission) errorCallback();
              },
              err =>{
                console.log("ERROR: " + err);
              }
              );
          }
          else{
            this.chooseImage()
          }
        },
        () => {console.log("PERMISSION ERROR")}
        )
    }

    chooseImage(){
      FileChooser.open()
      .then(uri => 
      {
        // FilePath.resolveNativePath(uri)
        // .then(filePath => console.log("filePath from FilePath: " + filePath))
        // .catch(err => console.log(err));

        let uripath = "" + uri;

        window.FilePath.resolveNativePath(uripath,
          url =>{
            console.log("FilePath From window.FilePath : " + url);
            this.img_url = url;
            this.extractImage("" + url);

          },
          err =>{
            console.log("FUCKING ERROR: " + err);
          }
          );
      }).catch(e => console.log(e));      
    }


    extractImage(url){
      let l = url.split("/");
      let fileName = l[l.length - 1];
      let path = url.replace(fileName, "");
      console.log("fileName: " + fileName + "\n" + "path: " + path);
      File.readAsBinaryString(path, fileName)
      .then(data =>{
        this.image = {
          title: fileName,
          data: data,
        }
      })
      .catch(err => console.log("ERROR: "+ err));
    }

    newFood(){

      this.orderService.createFood(this.food, this.image)
      .subscribe(
        res =>{
          // console.log(res);
          // this.toast(res.title + "was created");
          // console.log("new food: " + this.food.type._id);
          this.viewCtlr.dismiss(this.food.type._id);

        },
        err =>{
          this.toast(err);
          this.viewCtlr.dismiss();
        } 
        )
    }
    getToppings(){
      this.orderService.getTopping().subscribe(
        toppings =>{
          this.toppings = toppings;
        },
        err =>{
          this.toast(err);
        }
        );
    }
    addToppingToFood(topping){
      this.food.toppings.push(topping);
    }
  }



