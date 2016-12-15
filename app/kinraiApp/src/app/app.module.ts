//Module
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';


//Pages
import { MyApp } from './app.component';
import { QueueMainPage} from '../pages/queue-main/queue-main';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';
import { ManagementsPage } from '../pages/managements/managements';
import { FoodCategoriesPage } from '../pages/food-categories/food-categories';
import { FoodByTypePage } from '../pages/food-by-type/food-by-type';

//Component
import { QueueList} from '../components/queue-list/queue-list.component';
import { ModalAddQueuePage } from '../pages/modal-add-queue/modal-add-queue';
import { ModalCreateFoodPage} from '../pages/modal-create-food/modal-create-food';
import { ModalNewOptionPage} from '../pages/modal-new-option/modal-new-option';

//Providers
// import { OrderService} from '../providers/order-service/order-service';

@NgModule({
  declarations: [
    MyApp,
    QueueList,
    QueueMainPage,
    ContactPage,
    TabsPage,
    ModalAddQueuePage,
    ModalCreateFoodPage,
    ManagementsPage,
    FoodCategoriesPage,
    FoodByTypePage,
    ModalNewOptionPage
    
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    QueueList,
    QueueMainPage,
    ContactPage,
    TabsPage,
    ModalAddQueuePage,
    ModalCreateFoodPage,
    ManagementsPage,
    FoodCategoriesPage,
    FoodByTypePage,
    ModalNewOptionPage

  ],
  // providers: [ OrderService ],
})
export class AppModule {}
