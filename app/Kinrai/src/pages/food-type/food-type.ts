import { Component, ViewChild, OnInit } from '@angular/core';
import { 
  AlertController, NavController, NavParams, 
  ModalController, ActionSheetController, Slides, 
  ToastController, LoadingController 
} from 'ionic-angular';



import { OrderService } from '../../providers/order-service';
import { ModalAddFoodComponent } from '../../components/modal-add-food/modal-add-food';
import { FoodPage } from '../food/food';

/*
  Generated class for the FoodType page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-food-type',
    templateUrl: 'food-type.html',
    providers: [OrderService]
  })
  export class FoodTypePage {

    categoryId: string;
    category: any;
    constructor(
      private orderService: OrderService,
      public loadingCtrl: LoadingController,
      public toastCtrl: ToastController,
      public alertCtrl: AlertController,
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public modalCtrl: ModalController, 
      public actSheetCtrl: ActionSheetController
      ) 
    {
      this.categoryId = this.navParams.get('categoryId');
      this.category = {
        title: "",
        types: []
      }

    }

    ngOnInit(){
      this.getTypes(this.categoryId);
      // console.log(this.categoryId);
      console.log("this.categoryId");

    }

    ionViewDidLoad() {
      console.log('Hello FoodByTypePage Page');
    }
    

    openFood(typeId){
      this.navCtrl.push(FoodPage, {categoryId: this.categoryId, typeId: typeId, cat: this.category});
    }

    getTypes(categoryId){
      let loading = this.loadingCtrl.create({
        content: "Please wait a minute..."
      });

      loading.present().then(()=>{
        this.orderService.getTypes(categoryId).subscribe(
          res =>{
            // console.log(res);
            // this.toast("we got types"); 
            this.category = res;
            console.log(this.category);
          },
          err =>{
            console.log(err);
            this.toast(err);
          }
          );
        loading.dismiss();
      });        
    }

    newType(){
      let alert = this.alertCtrl.create({
        title: "New Type",
        inputs: [
        {name: 'title', placeholder: 'Title'}
        ],
        buttons: [
        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'save',
          handler: data => {
            this.orderService.newType(data.title, this.categoryId).subscribe(
              res =>{
                //return types
                this.category = res;
                // this.toast("New Type created");
              },
              err =>{
                this.toast(err);
              }
              );
          }
        }
        ]
      });
      alert.present();
    }



    toast(messages){
      let toast = this.toastCtrl.create({
        message: messages,
        duration: 3000
      });
      toast.present();
    }




    doRefresh(refresher){
      this.getTypes(this.categoryId);

      // refresher.complete();
      // console.log(refresher);

      setTimeout(()=>{
        refresher.complete();
      }, 0);

    }
  }