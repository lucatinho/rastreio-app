import {StatusProductType} from "../enum/statusProduct-type.enum";
import {Rastreio} from "./rastreio.model";

export class Product {
  cod: string;
  name: string;
  status?: StatusProductType;
  data?: number;
  rastreio?: Rastreio;

  constructor() {
    this.rastreio = new Rastreio();
  }
}
