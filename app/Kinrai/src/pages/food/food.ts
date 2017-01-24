import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, 
  ActionSheetController, Slides, ToastController, 
  LoadingController, ViewController 
} from 'ionic-angular';


import { OrderService } from '../../providers/order-service';

import { ToppingPage } from '../../pages/topping/topping';
import { ModalAddFoodComponent } from '../../components/modal-add-food/modal-add-food';
/*
  Generated class for the Food page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */

  @Component({
  	selector: 'page-food',
  	templateUrl: 'food.html',
    providers: [OrderService]
  })
  export class FoodPage {
  	@ViewChild(Slides) slides:Slides; 

    category: any;
    categoryId: string;
    typeId: string;
    typeIndex: number;
    // currentCategory: any;
    // categories: Array<any>;
    // types: Array<any>;

    currentType: string;
    // selectTypes: Array<any>;    
    constructor(
      private orderService: OrderService,
      public toastCtrl: ToastController,
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public modalCtrl: ModalController, 
      public actSheetCtrl: ActionSheetController,
      public viewCtrl: ViewController,
      public loadingCtrl: LoadingController
      ) 
    {
      this.category = this.navParams.get('cat');
      // this.category = {title:"", types:[]};
      this.categoryId = this.navParams.get('categoryId');
      this.typeId = this.navParams.get('typeId');
    }

    ngOnInit(){
      this.getCategory(this.categoryId);
      console.log("ngOnInit");
      // this.getCategory(this.categoryId);
    }

    ionViewDidLoad() {
      console.log('Hello FoodByTypePage Page');
    }

    getCategory(categoryId){
      let loading = this.loadingCtrl.create({
        content: "Please wait a minute..."
      });

      loading.present().then(()=>{
        this.orderService.getAllFoodFromCat(categoryId).subscribe(
          res =>{
            this.category = res;
            this.typeIndex = this.category.types.map(type=>{return type._id}).indexOf(this.typeId);
            console.log("d[wp: " + this.typeIndex);
            if(this.category.types.length !== 0)
              this.currentType = this.category.types[this.typeIndex].title;
            else 
              this.currentType = "";
            this.slides.slideTo(this.typeIndex);
          },
          err =>{
            console.log(err);
            this.toast(err);
          }
          );
        loading.dismiss();
      });
    }

    selectType(){
      let types = [];
      if(this.category.types.length != 0){
        this.category.types.forEach(type =>{
          types.push({
            text: type.title,
            handler: ()=>{
              let typeIndex = this.category.types.map((type)=>{return type.title}).indexOf(type.title);
              this.currentType = type.title;
              this.slides.slideTo(typeIndex);
            },
          });
        });

        let actionsheet = this.actSheetCtrl.create({
          title: "select food's type",
          buttons: types
        });
        actionsheet.present();
      }
    }

    slideChanged(){
      console.log(this.slides.getActiveIndex());
      this.typeIndex = this.slides.getActiveIndex();
      this.typeId = this.category.types[this.typeIndex]._id;
      console.log(this.typeId);
      this.currentType = this.category.types[this.typeIndex].title;
      // console.log("Current Index" + this.slides.getActiveIndex() + " Type: " + this.category.types[this.slides.getActiveIndex()].title); 
      if(this.slides.isEnd())
      {  
        console.log("get lock next");
        this.slides.lockSwipeToNext(true);
        this.slides.lockSwipeToPrev(false);

      }
      else if(this.slides.isBeginning()) 
      {
        console.log("get lock prev");
        this.slides.lockSwipeToPrev(true);
        this.slides.lockSwipeToNext(false);

      }
      else this.slides.lockSwipes(false);

    }
    openModalNewFood(){
      let modal = this.modalCtrl
      .create(
        ModalAddFoodComponent, 
        {
          category: this.category,
          currentType: this.category.types[this.slides.getActiveIndex()]
        });
      modal.onDidDismiss(typeId =>{
        if(typeId){
          this.typeId = typeId;
          this.getCategory(this.categoryId);
        }
        // this.typeId = typeId;
        // this.typeIndex 
        // this.events.push(event);
      });
      modal.present();
    }

    openTopping(){
      this.navCtrl.push(ToppingPage); 
    }


    //=============Utilities=============

    toast(messages){
      let toast = this.toastCtrl.create({
        message: messages,
        duration: 3000
      });
      toast.present();
    }

    doRefresh(refresher){
      // this.typeIndex = this.slides.getActiveIndex();
      this.getCategory(this.categoryId);

      // refresher.complete();
      // console.log(refresher);

      setTimeout(()=>{
        refresher.complete();
      }, 0);

    }



  }
