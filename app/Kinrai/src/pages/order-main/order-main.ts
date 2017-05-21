import { Component, NgZone, ViewChild } from '@angular/core';
import { AlertController, ToastController, NavController, NavParams, ModalController, ViewController, Select } from 'ionic-angular';



import { PreodersPage } from '../../pages/preoders/preoders';
import { ModalAddOrderComponent } from '../../components/modal-add-order/modal-add-order';
import { ModalAddFoodComponent } from '../../components/modal-add-food/modal-add-food';
import { OrderService } from '../../providers/order-service';

declare var io;
declare var cordova:any;
// declare var window:any;

@Component({
  selector: 'page-order-main',
  templateUrl: 'order-main.html',
  providers: [OrderService]
})
export class OrderMainPage {

  @ViewChild('catsSelect') catsSelect: Select; 
  isRe:boolean = false;
  isToggle:boolean = true;

  categories: any;
  chosenCats: any;
  chosenCatsTxt: string;

  counter:any;
  countdown: number;

  status: any;
  orders: any;

  isPreOrderComing: boolean;
  currentItem:number;
  socket: any;

  constructor(
    public alertCtrl: AlertController,
    private zone: NgZone,
    private orderService: OrderService,
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController
    ) {
    this.currentItem = 0;
    this.isPreOrderComing = false;
    this.categories = [];
    this.chosenCats = [];
    this.chosenCatsTxt = "All Category";
    this.countdown = 5;
    this.status = "waiting";   
    this.orders = [];

    this.getFullCategories();
    this.getOrders();
    // this.countDown();





    // =======================================================================

    this.socket = io(this.orderService.server);
    this.socket.on('pre-order is coming', (msgs)=>{
      if(!this.isPreOrderComing)
        this.isPreOrderComing = true;
    })
    this.socket.on('orders changed', (msgs)=>{
      console.log("orders has changed");
      this.getOrderByFilter();
      // this.zone.run(()=>{
        //       this.toast("Messages: " + msgs);
        //     });
      });
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad OrderMainPage');
  }
  changeCurItem(index){
    this.currentItem = index;
  }

  getFullCategories(){
    this.orderService.getFullCategories().subscribe(
      res =>{
        this.categories = res;
      },
      err =>{
        console.log(err);
      }
      );
  }

  getOrders(){
    this.orderService.getOrders().subscribe(
      res =>{
        res.map(order=>{
          if(order.bill != null)
            this.orders.push(order);
        })
        console.log("orders from", this.orders);
      },
      err =>{
        this.toast(err);
      }

      );

  }


  emitHello(){
    this.socket.emit('hello', "Hello from the client side");
  }

  showAddQueueModal(){
    let modal = this.modalCtrl.create(ModalAddOrderComponent);
    modal.present();
  }

  showCreateFoodModal(){
    let modal = this.modalCtrl.create(ModalAddFoodComponent);
    modal.present();
  }    

  toast(messages){
    let toast = this.toastCtrl.create({
      message: messages,
      duration: 3000
    });
    toast.present();
  }

  setDone(order_id){
    let confirm = this.alertCtrl.create({
      title: 'Did you done this order ?',
      message: 'Please make sure before done this order',
      buttons: [
      {
        text: 'Cancel',
        handler: () => {
          // console.log('Disagree clicked');
        }
      },
      {
        text: 'OK',
        handler: () => {
          this.changeOrderStatus(order_id, "done");
        }
      }
      ]
    });
    confirm.present();
  }

  changeOrderStatus(order_id, status){
    // if(status == "waiting"){
      //   this.countdown = 5;
      //   clearInterval(this.counter);
      // }
      this.orderService.changeOrderStatus(order_id, status).subscribe(
        res =>{
          // this.toast(res);
          console.log(res);
          setTimeout(()=>{
            this.socket.emit('orders changed', "some order's status has changed.");
          }, 250);
        },
        err =>{
          this.toast(err);
        }
        );
    }

    chooseCats(){
      // this.getFullCategories();
      this.catsSelect.open();
    }

    getOrderByFilter(){
      this.chosenCatsTxt = "";
      console.log(this.chosenCats.length +" "+ this.categories.length);
      if(this.chosenCats.length != this.categories.length){
        if(this.chosenCats.length == 1)
          this.chosenCatsTxt = this.chosenCats[0].title;
        else{
          this.chosenCats.map(cat =>{
            this.chosenCatsTxt += cat.title + " ";
          });
        }
      }else{
        this.chosenCatsTxt = "All Category";
      }

      let chosenCatsId = []; 
      this.chosenCats.forEach(cat =>{ chosenCatsId.push(cat._id)});
      if(chosenCatsId.length == 0){
        this.categories.forEach(cat =>{ chosenCatsId.push(cat._id)});
        this.chosenCatsTxt = "All Category";
      }

      this.orderService.getOrderByFilter(chosenCatsId).subscribe(
        orders =>{
          // console.log(orders); 
          this.orders = []
          orders.map(order=>{
            if(order.food.category && order.bill){
              this.orders.push(order);
            }
          });
            console.log(this.orders);
        },
        err =>{
          console.log(err);
        }
        )
    }

    openPreOrders(){
      this.isPreOrderComing = !this.isPreOrderComing;
      let modal = this.modalCtrl.create(PreodersPage);
      modal.present();
    }

    dd(){
      console.log(this.isPreOrderComing);
      this.isPreOrderComing = !this.isPreOrderComing;
    }
  }
