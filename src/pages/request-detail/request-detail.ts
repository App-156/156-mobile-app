import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Requests } from '../../providers/providers';


@Component({
  selector: 'page-item-detail',
  templateUrl: 'request-detail.html'
})
export class RequestDetailPage {
  item: any;

  constructor(public navCtrl: NavController, navParams: NavParams, items: Requests) {
    this.item = navParams.get('item') || items.defaultItem;
  }

}
