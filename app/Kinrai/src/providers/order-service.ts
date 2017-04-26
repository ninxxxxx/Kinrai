import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {ToastController} from 'ionic-angular';
/*
  Generated class for the OrderService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
  	*/
  @Injectable()
  export class OrderService {

  	server: string;

  	constructor(public toastCtrl: ToastController, private http: Http) {

      // this.server = 'http://172.30.89.14:8080/';
      this.server = 'http://172.30.230.103:8080/';

    }

    getServer(){
      console.log(this.server);
      return this.server;
    }
    


    getCategories(){
      let url = this.server + 'category';
      let response = this.http.get(url).map(res => res.json());
      return response;

    }

    getFullCategories(){
      let url = this.server + 'category/getfull';
      let response = this.http.get(url).map(res => res.json());
      return response;
    }

    newCategory(categoryTitle){
      let url = this.server + 'category/new';
      let response = this.http.post(url, {categoryTitle}).map(res => res.json());
      return response;
    }
    getTypes(categoryId){
      let url = this.server + 'type';
      let response = this.http.post(url, {categoryId}).map(res => res.json());
      return response;      
    }

    newType(typeTitle, categoryId){
      let url = this.server + 'type/new';
      let response = this.http.post(url, {typeTitle, categoryId}).map(res => res.json());
      return response;
    }

    getAllFoodFromCat(categoryId){
      let url = this.server + 'food';
      let response = this.http.post(url, {categoryId}).map(res => res.json());
      return response; 
    }

    getFoodById(foodId){
      let url = this.server + 'food/getById';
      // let header = new Headers({ 'content-type' : 'application/json' });
      // let options = new RequestOptions({ headers: header});
      let response = this.http.post(url, {foodId}).map(res => res.json());
      return response;      
    }

    createFood(food, image){
      let url = this.server + 'newfood';

      let header = new Headers({ 'content-type' : 'application/json' });
      let options = new RequestOptions({ headers: header});
      let response = this.http.post(url, {food, image}, options).map(res => res.json());
      // console.log(response);
      return response;
    }

    getTopping(){
      let url = this.server + 'topping';
      let response = this.http.get(url).map(res => res.json());
      return response;
    }

    newTopping(topping){
      let url = this.server + 'topping/new';
      let response = this.http.post(url, {topping}).map(res => res.json());
      return response; 
    }

    getOrders(){
      // let url = 'http://localhost:5555/foods';
      let url = this.server + 'orders/';
      console.log(url);
      // let url = 'http://192.168.43.252:5555/foods';
      let response = this.http.get(url).map(res => res.json());
      return response;
    }

    getOrderByFilter(chosenCats){
      // let url = 'http://localhost:5555/foods';
      let url = this.server + 'orders/findbycategories';
      console.log(url);
      // let url = 'http://192.168.43.252:5555/foods';
      let response = this.http.post(url, {chosenCats}).map(res => res.json());
      return response;
    }

    createOrder(food){
      // let url = this.server + 'newOrder'
      let url = this.server + 'newfood'
      let header = new Headers({ 'content-type' : 'application/json' });
      let options = new RequestOptions({ headers: header});

      let amount = 2;

      let response = this.http.post(url, {food, amount}, options).map(res=> res.json());
      return response;
    }

    changeOrderStatus(order_id, status){
      let url = this.server + 'order/' + order_id + "/changestatus/" + status;
      // console.log(url);
      let response = this.http.get(url).map(res => res.json());
      return response;
    }


    createBill(bill){
      let url = this.server + 'bill/new';
      let response = this.http.post(url, {bill}).map(res => res.json());
      return response;  
    }

    getTableNumbers(){
      let header = new Headers({ 'content-type' : 'application/json', 'Access-Control-Allow-Origin': '*' });
      let options = new RequestOptions({ headers: header});
      let url = this.server + 'bills/table_number';
      let response = this.http.get(url).map(res => res.json());
      return response;   
    }

    getBillsFromTable(tableNumber){
      let url = this.server + 'bills/table_number/';
      let response = this.http.post(url, {tableNumber}).map(res => res.json());
      return response;    
    }

    getBillFromId(billId){
      let url = this.server + 'bill/' + billId;
      let response = this.http.get(url).map(res => res.json());
      return response;    
    }

    getUntitledBills(){
      let url = this.server + 'bills/untitled/';
      let response = this.http.get(url).map(res => res.json());
      return response;    
    }

    checkBill(bill_ids){
      let url = this.server + 'bills/checkbill/';
      let response = this.http.post(url, {bill_ids}).map(res => res.json());
      return response;     
    }



    // ==============================================================================================

    getTable(){
      let url = this.server + 'tables/';
      let response = this.http.get(url).map(res => res.json());
      return response;           
    }

    newTableZone(zone, tables){
      let url = this.server + 'tables/new';
      let response = this.http.post(url, {zone: zone, tables: tables}).map(res => res.json());
      return response;            
    }
    //Sh = Sales History 
    getShOfDay(date){
      let url = this.server + 'sales/getByDate';
      let response = this.http.post(url, {date: date}).map(res => res.json());
      return response;
    }    

  }
