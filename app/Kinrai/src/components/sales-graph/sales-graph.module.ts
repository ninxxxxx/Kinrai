import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { SalesGraph } from './sales-graph';

@NgModule({
  declarations: [
    SalesGraph,
  ],
  imports: [
    IonicPageModule.forChild(SalesGraph),
  ],
  exports: [
    SalesGraph
  ]
})
export class SalesGraphModule {}
