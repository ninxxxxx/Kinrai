import { Component, ViewChild } from '@angular/core';
import { ActionSheetController, Slides, LoadingController, NavParams, NavController, ViewController, ToastController, ModalController } from 'ionic-angular';

import { OrderService } from '../../providers/order-service';

/*
  Generated class for the ChooseFood page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-choose-food',
  	templateUrl: 'choose-food.html',
    providers: [OrderService]
  })
  export class ChooseFoodPage {
    @ViewChild(Slides) slides: Slides;
    categories: Array<any>;
    curCategory: any;
    curType: any;

    curCatText: String;
    curTypeText: String;
    constructor(
      public viewCtrl: ViewController,
      public actSheetCtrl: ActionSheetController,
      public loadingCtrl: LoadingController, 
      public toastCtrl: ToastController, 
      public modalCtrl: ModalController, 
      private orderService: OrderService, 
      public navCtrl: NavController, 
      public navParams: NavParams
      ) 
    {	
      this.categories = [];
      this.curCategory = {title: ""};
      this.curType = {title: ""};
      this.getFullCats();

    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad ChooseFoodPage');
    }

    getFullCats(){

      this.orderService.getFullCategories().subscribe(
        categories =>{
          if(categories)
            this.categories = categories;
          this.curCategory = this.categories[0];
          this.curType = this.categories[0].types[0];
        },
        err =>{
          this.toast(err);
        }
        );  
    }

    selectCategory(){
      let catButtons = [];
      if(this.categories.length != 0)
      {
        this.categories.forEach(cat =>
        {
          if(cat.types.length != 0)
          {

            catButtons.push(
            {
              text: cat.title,
              handler: ()=>{
                this.curCatText = cat.title;
                this.curCategory = cat;
                this.curType = cat.types[0];
                this.curTypeText = cat.types[0].title;
                // this.curCategory.types.forEach(type =>{
                  //   if(type.foods.length != 0){
                    //     if(this.curTypeText == ""){
                      //       this.curType = type;
                      //       this.curTypeText = type.title;
                      //     }
                      //   }
                      // });
                    }
                  });
          }
        })
      }  
      let actionsheet = this.actSheetCtrl.create({
        title: "select category",
        buttons: catButtons
      });
      actionsheet.present();
    }

    selectType(){
      let types = [];
      if(this.curCategory.types.length != 0){
        this.curCategory.types.forEach(type =>{
          if(type.foods.length != 0){
            types.push({
              text: type.title,
              handler: ()=>{
                this.curTypeText = type.title;
                this.curType = type; 
                // let typeIndex = this.curCategory.types.map((type)=>{return type.title}).indexOf(type.title);
                // this.slides.slideTo(typeIndex);
              },
            });
          }
        });
      }
      let actionsheet = this.actSheetCtrl.create({
        title: "select food's type",
        buttons: types
      });
      actionsheet.present();
    }

    // slideChanged(){
      //   console.log(this.slides.getActiveIndex());
      //   // this.typeId = this.curCategory.types[this.typeIndex]._id;
      //   // console.log(this.typeId);
      //   this.curTypeText = this.curCategory.types[this.slides.getActiveIndex()].title;
      //   // console.log("Current Index" + this.slides.getActiveIndex() + " Type: " + this.curCategory.types[this.slides.getActiveIndex()].title); 
      //   if(this.slides.isEnd())
      //   {  
        //     console.log("get lock next");
        //     this.slides.lockSwipeToNext(true);
        //     this.slides.lockSwipeToPrev(false);

        //   }
        //   else if(this.slides.isBeginning()) 
        //   {
          //     console.log("get lock prev");
          //     this.slides.lockSwipeToPrev(true);
          //     this.slides.lockSwipeToNext(false);

          //   }
          //   else this.slides.lockSwipes(false);

          // }

          choose(foodId){
            console.log("foodId: " + foodId);
            this.viewCtrl.dismiss(foodId);
          }

          toast(messages){
            let toast = this.toastCtrl.create({
              message: messages,
              duration: 3000
            });
            toast.present();
          }

          cancel(){
            this.viewCtrl.dismiss();
          }
        }
