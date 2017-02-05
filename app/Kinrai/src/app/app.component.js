var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { TabsPage } from '../pages/tabs/tabs';
import { ManagementPage } from '../pages/management/management';
import { FoodCategoriesPage } from '../pages/food-categories/food-categories';
var MyApp = (function () {
    function MyApp(platform) {
        this.rootPage = TabsPage;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
        this.groupPages = [
            {
                name: "Home",
                pages: [{ title: 'Order/Payment', component: TabsPage }]
            },
            {
                name: "Managements",
                pages: [
                    { title: 'Foods', component: FoodCategoriesPage },
                    { title: 'Promotion', component: ManagementPage },
                    { title: 'Sales History', component: ManagementPage },
                ]
            }
        ];
    }
    MyApp.prototype.openPage = function (page) {
        this.nav.push(page);
    };
    return MyApp;
}());
__decorate([
    ViewChild(Nav),
    __metadata("design:type", Nav)
], MyApp.prototype, "nav", void 0);
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [Platform])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map