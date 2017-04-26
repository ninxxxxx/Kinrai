import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodRanking } from './food-ranking';

@NgModule({
  declarations: [
    FoodRanking,
  ],
  imports: [
    IonicPageModule.forChild(FoodRanking),
  ],
  exports: [
    FoodRanking
  ]
})
export class FoodRankingModule {}
