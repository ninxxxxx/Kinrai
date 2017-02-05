import { Component, NgZone, ViewChild } from '@angular/core';
import { ToastController, NavController, NavParams, ModalController, ViewController, Select } from 'ionic-angular';




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

  socket: any;

  constructor(
    private zone: NgZone,
    private orderService: OrderService,
    public toastCtrl: ToastController,
    public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public viewCtrl: ViewController
    ) {

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
    this.socket.on('orders changed', (msgs)=>{
      console.log("orders has changed");
      this.getOrders();
      // this.zone.run(()=>{
        //       this.toast("Messages: " + msgs);
        //     });
      });
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad OrderMainPage');
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
        this.orders = res;
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
    let indx = this.orders.map(order =>{ return order._id}).indexOf(order_id);
    this.orders[indx].status = 'done';
    this.counter = setInterval(()=>{
      this.countdown--;
      if(this.countdown == 0){
        this.countdown = 5;
        clearInterval(this.counter);
        this.changeOrderStatus(order_id, 'done');
      } 
    }, 1000)
  }

  changeOrderStatus(order_id, status){
    if(status == "waiting"){
      this.countdown = 5;
      clearInterval(this.counter);
    }
    this.orderService.changeOrderStatus(order_id, status).subscribe(
      res =>{
        // this.toast(res);
        console.log(res);
        setTimeout(()=>{
          this.socket.emit('orders changed', "some order's status has changed.");
        }, 500);
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

    this.orderService.getOrderByFilter(chosenCatsId).subscribe(
      orders =>{
        console.log(orders); 
        this.orders = []
        orders.map(order=>{
          if(order.food.category)
            this.orders.push(order);
        });
      },
      err =>{
        console.log(err);
      }
      )
  }
}
