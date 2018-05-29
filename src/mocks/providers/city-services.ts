import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CityService } from '../../models/city-service';

@Injectable()
export class CityServices {
  items: CityService[] = [];

  defaultItem: any = {
    "name": "Poda de árvore",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Poda.",
  };

  constructor(public http: Http) {
    let items = [
      {
        "name": "Poda de árvore",
        "profilePic": "assets/img/services/tree.png",
        "about": "Poda.",
      },
      {
        "name": "Corte de árvore",
        "profilePic": "assets/img/services/tree.png",
        "about": "Corte de árvore."
      },
      {
        "name": "Plantio de árvore",
        "profilePic": "assets/img/services/plant-tree.png",
        "about": "Plantio de árvore."
      },
      {
        "name": "Denúncia de falta de plantio",
        "profilePic": "assets/img/services/plant-tree.png",
        "about": "Denúncia de falta de plantio após supressão."
      },
      {
        "name": "Obstrução da via",
        "profilePic": "assets/img/services/traffic-cone.png",
        "about": "Obstrução da via por árvores e galhos caídos."
      },
      {
        "name": "Capinação de mato",
        "profilePic": "assets/img/services/tulip.png",
        "about": "Capinação de mato."
      }
    ];

    for (let item of items) {
      this.items.push(new CityService(item));
    }
  }

  query(params?: any) {
    if (!params) {
      return this.items;
    }

    return this.items.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(item: CityService) {
    this.items.push(item);
  }

  delete(item: CityService) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
