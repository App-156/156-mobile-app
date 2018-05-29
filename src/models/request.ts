export class Request {
    /*public categoryID: number;
    public categoryDescription: string;
    public categoryName: string;*/

    constructor(private fields: any) {
        // Quick and dirty extend/assign fields to this model
        for (let f in fields) {
          this[f] = fields[f];
        }
      }
}