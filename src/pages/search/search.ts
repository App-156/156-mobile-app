import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ItemDetailPage } from '../item-detail/item-detail';

import { CityService } from '../../models/item';

import { CityServices } from '../../providers/providers';


@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  
  currentItems: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public items: CityServices) { }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.items.query({
      name: val
    });
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
