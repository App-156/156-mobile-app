import { Categories } from './../../mocks/providers/categories';
import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { ItemCreatePage } from '../item-create/item-create';
import { ItemDetailPage } from '../item-detail/item-detail';

import { CityServices } from '../../providers/providers';
import { Category } from './../../models/category';
import { CityService } from '../../models/city-service';

@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentItems: CityService[];
  currentCategories: Category[];

  constructor(public navCtrl: NavController, public items: CityServices, public categories: Categories, public modalCtrl: ModalController) {
    this.currentItems = this.items.query();
    this.currentCategories = this.categories.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem(item: CityService) {
    let addModal = this.modalCtrl.create(ItemCreatePage, {
      item: item
    } );
    
    addModal.onDidDismiss(item => {
      if (item) {
        this.items.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(item) {
    this.items.delete(item);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(item: CityService) {
    this.navCtrl.push(ItemDetailPage, {
      item: item
    });
  }
}
