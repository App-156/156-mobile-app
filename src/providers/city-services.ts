import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Api } from './api';

import { CityService } from '../models/city-service';

@Injectable()
export class Items {

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    return this.api.get('/items', params)
      .map(resp => resp.json());
  }

  add(item: CityService) {
  }

  delete(item: CityService) {
  }

}
