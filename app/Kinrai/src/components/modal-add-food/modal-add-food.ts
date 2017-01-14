import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, ModalController } from 'ionic-angular';
import { File, FilePath, FileChooser } from 'ionic-native';


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
    templateUrl: 'modal-add-food.html'
  })
  export class ModalAddFoodComponent {

    permissions: any;
    img_url: string;
    food: any;
    curCat: string;
    categories: Array<any>;
    selectedCat: string;
    types: Array<string>;
    selectedType: string;
    options: Array<any>;  
    selectedOptions: Array<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtlr: ViewController, public modalCtrl: ModalController) {
      document.addEventListener('deviceready', ()=>{
        console.log("Device is Ready: window.Permissions");
        this.permissions = cordova.plugins.permissions;  
        // console.log("" + this.permissions + " " + this.permissionss + " " + this.permissionsss);
        // if(this.permissions == undefined) console.log("Permission is Undefined :("); 
      });
      this.categories = this.navParams.get('categories');
      this.curCat = this.navParams.get('curCat');
      
      // console.log("curCat: " + this.curCat);

      this.img_url = "";
      
      this.types = [
      "ต้ม",
      "ผัด",
      "แกง",
      "ทอด",
      ];
      this.options = [
      "ระดับความเผ็ด",
      "ระดับความหวาน",
      "ขนาด",
      ]
      this.food = {
        title: "",
        price: 0,
        estTime: 0,
        type:"",
        cat:"",
        options:""
      }
    }
    openNewOption(){
      let modal = this.modalCtrl.create(ModalAddOptionComponent);
      modal.present();
    }
    cancel(){
      this.viewCtlr.dismiss();
    }

    b(){

      FileChooser.open()
      .then(uri => {
        console.log("PLEASE ATOM");
        // console.log("" + cordova.file.dataDirectory);
        let uripath = "" + uri;

        window.FilePath.resolveNativePath(uripath,
          url =>{
            console.log("I GOT FILE PATH !! : " + url);
            this.img_url = url;
          },
          err =>{
            console.log("FUCKING ERROR: " + err);
          }
          );
      }).catch(e => console.log(e));   

    }

    bb(){

      this.permissions.hasPermission(this.permissions.READ_EXTERNAL_STORAGE,
        status => {
          this.checkPermissionCallback(status);
          FileChooser.open()
          .then(uri => 
          {
            FilePath.resolveNativePath(uri)
            .then(filePath => console.log("filePath from FilePath: " + filePath))
            .catch(err => console.log(err));

            let uripath = "" + uri;

            window.FilePath.resolveNativePath(uripath,
              url =>{
                console.log("FilePath From window.FilePath : " + url);
                this.img_url = url;
                this.getImageData(url);
              },
              err =>{
                console.log("FUCKING ERROR: " + err);
              }
              );
          }).catch(e => console.log(e));       
        },
        () => {console.log("PERMISSION ERROR")}
        );

    }

    checkPermissionCallback(status){
      if(!status.hasPermission){
        let errorCallback = function(){
          console.warn('External Reading is turn off');
        }
        this.permissions.requestPermission(this.permissions.READ_EXTERNAL_STORAGE,
          status =>{
            if(!status.hasPermission) errorCallback();
          },
          errorCallback
          );
      }
    }

    getImageData(url){
      let lst = url.split("/")
      let fileName = lst[lst.length - 1]
      console.log("fileName: " + fileName);
      let path = url.replace(fileName, "");
      console.log("path: " + path);

      File.readAsBinaryString(path, fileName)
          .then((res)=>{
            console.log("res: " + res);
          })
          .catch((err)=>{
            console.log("error: " + err);
          })
    }
  }
