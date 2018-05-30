import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CityServices } from '../../providers/providers';

@Component({
  selector: 'page-item-detail',
  templateUrl: 'item-detail.html'
})
export class RequestDetailPage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, items: CityServices) {
    this.item = navParams.get('item') || items.defaultItem;
  }

}
