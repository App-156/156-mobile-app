import { Request } from './../../models/request';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Requests {
  items: Request[] = [];

  defaultItem: any = {
    "name": "Poda de árvore",
    "profilePic": "assets/img/speakers/bear.jpg",
    "about": "Poda.",
  };

  constructor(public http: Http) {
    let items = [
      {
        "name": "Arborismo",
        "profilePic": "assets/img/services/tree.png",
        "services": [
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
          }
        ]
      },
      {
        "name": "Vias públicas",
        "profilePic": "assets/img/services/traffic-cone.png",
        "about": "Corte de árvore.",
        "services": [
          {
            "name": "Obstrução da via",
            "profilePic": "assets/img/services/traffic-cone.png",
            "about": "Obstrução da via por árvores e galhos caídos."
          },
        ]
      },
      {
        "name": "Jardinagem",
        "profilePic": "assets/img/services/tulip.png",
        "about": "Capinação de mato.",
        "services":[
          {
            "name": "Capinação de mato",
            "profilePic": "assets/img/services/tulip.png",
            "about": "Capinação de mato."
          }
        ]
      }
    ];

    for (let item of items) {
      this.items.push(new Request(item));
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

  add(item: Request) {
    this.items.push(item);
  }

  delete(item: Request) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
