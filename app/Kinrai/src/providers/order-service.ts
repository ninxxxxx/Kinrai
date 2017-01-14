import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the OrderService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
  	*/
  @Injectable()
  export class OrderService {

  	server: string;

  	constructor(private http: Http) {
  		this.server = 'http://172.30.230.105:8080/';
  		// this.server = 'http://192.168.1.102:5555/';

  	}

  	getOrders(){
  		// let url = 'http://localhost:5555/foods';
  		let url = this.server + 'orders';
  		console.log(url);
  		// let url = 'http://192.168.43.252:5555/foods';
  		let response = this.http.get(url).map(res => res.json());
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

    createFood(food){
      let url = this.server + 'newfood';

      let header = new Headers({ 'content-type' : 'application/json' });
      let options = new RequestOptions({ headers: header});

      // let food = {
      //   title: "food from app",
      //   price: 12,
      //   type: "snack",
      //   category: "test",
      //   estTime: 2
      // }

      let response = this.http.post(url, {food}, options).map(res => res.json());
      // console.log(response);
      return response;
    }

  }
