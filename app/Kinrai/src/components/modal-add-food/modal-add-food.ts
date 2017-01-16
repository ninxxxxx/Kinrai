
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
    curCat: string;
    selectedCat: string;
    selectedType: string;
    
    categories: Array<any>;
    types: Array<string>;
    options: Array<any>;  
    selectedOptions: Array<any>;
    
    constructor(
      public navCtrl: NavController, 
      private viewCtlr: ViewController, 
      public modalCtrl: ModalController,
      public toastCtrl: ToastController,
      public navParams: NavParams, 
      private orderService: OrderService,
      ) 
    {
      this.categories = this.navParams.get('categories');
      this.curCat = this.navParams.get('curCat');
      console.log("curCat: " + this.curCat);
      this.types = ["ต้ม","ผัด","แกง","ทอด",];
      this.options = ["ระดับความเผ็ด","ระดับความหวาน","ขนาด"];
      this.food = {
        title: "donut", price: 0, estTime: 0, type: "", cat: "", options: "", img_url: "", image: null
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
            // this.img_url = url;
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
        this.food.image = {
          title: fileName,
          data: data,
        }
        this.newFood();
      })
      .catch(err => console.log("ERROR: "+ err));
    }





    newFood(){
      // let food = {
        //   title: "arnon"
        // }
        this.orderService.createFood(this.food)
        .subscribe(
          res =>{
            console.log(res);
            this.img_url = res.url;
          },
          err =>{
            console.log("err: " + err);
          } 
          )

      }
    }



