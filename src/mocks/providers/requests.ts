import { Request } from './../../models/request';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class Requests {
  items: Request[] = [];

  defaultItem: any = {
    "id": 1,
    "cityhallservice": { 
      "name": "Corte de árvore",
      "profilePic": "assets/img/services/tree.png",
      "about": "Corte de árvore."
    },
    "description": "A árvore está ficando oca por dentro, favor realizar corte por segurança.",
    "date": "15/04/2018",
    "image": "assets/img/services/brokentree.png",
    "status": "Aberto",
    "response": "",
    "address": "Rua João da Silva, 123",
    "longitude": 12.5,
    "latitude": 15.6
  };

  constructor(public http: Http) {
    let items = [
      {
        "id": 1,
        "cityhallservice": { 
          "name": "Corte de árvore",
          "profilePic": "assets/img/services/tree.png",
          "about": "Corte de árvore."
        },
        "description": "A árvore está ficando oca por dentro, favor realizar corte por segurança.",
        "date": "15/04/2018",
        "image": "assets/img/services/brokentree.png",
        "status": "Aberto",
        "response": "",
        "address": "",
        "longitude": 12.5,
        "latitude": 15.6
      },
      {
        "id": 2,
        "cityhallservice": {
          "name": "Plantio de árvore",
          "profilePic": "assets/img/services/plant-tree.png",
          "about": "Plantio de árvore."
        },
        "description": "Faz dois anos que desde que uma árvore foi removida desta calçada e nenhuma foi plantanda no local.",
        "date": "20/05/2018",
        "image": "assets/img/services/holesidewalk.jpg",
        "status": "Fechado",
        "response": "O plantio foi realizado no dia 30/05/2018.",
        "address": "",
        "longitude": 12.5,
        "latitude": 15.6
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
