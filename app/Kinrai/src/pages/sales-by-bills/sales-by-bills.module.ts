import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesByBills } from './sales-by-bills';

@NgModule({
  declarations: [
    SalesByBills,
  ],
  imports: [
  IonicPageModule.forChild(SalesByBills),
  ],
  exports: [
    SalesByBills
  ]
})
export class SalesByBillsModule {}
