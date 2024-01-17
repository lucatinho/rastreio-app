import {StatusProductType} from "../enum/statusProduct-type.enum";
import {Evento} from "./rastreio.model";

export class Product {
  cod: string;
  name: string;
  status?: StatusProductType;
  data?: number;
  rastreio?: Evento[];

  constructor() {
    this.rastreio = new Array<Evento>();
  }
}
