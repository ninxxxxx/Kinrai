import { Component, ViewChild, Input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts/ng2-charts'; 




/**
 * Generated class for the SalesGraph component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
 @Component({
 	selector: 'sales-graph',
 	templateUrl: 'sales-graph.html'
 })
 export class SalesGraph {
 	@ViewChild(BaseChartDirective) chart: BaseChartDirective;
 	
 	@Input() in;
 	ngOnChanges(change){
 		console.log("changed");
 		// console.log(change);
 		let graphData = change.in.currentValue;
 		graphData.map(graph=>{
 			this.data[0].data.push(graph.sale);
 			this.labels.push("" + graph.hours);
 		})
 		this.chart.chart.update();
 		// this.chart.chart.update();
 	}

 	public data: Array<any> = [0];
 	public labels: Array<any> = ['0'];
 	
 	
 	public lineChartOptions:any = {
 		responsive: true
 	};
 	public lineChartLegend:boolean = false;
 	public lineChartType:string = 'line';


 	constructor() {
 	}

 }
