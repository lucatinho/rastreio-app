import {Injectable} from '@angular/core';

import {Storage} from '@ionic/storage-angular';
import {Product} from "../models/product.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private key = '@products';

  constructor(private storage: Storage) {
    this.init().then();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  public async set(newProduct: Product) {
    let produtos = await this?.storage.get(this.key);
    if (!produtos) {
      produtos = [];
    } else {
      const produtoConflito: Product = produtos.find((produto: Product) => produto.cod === newProduct.cod);
      if (produtoConflito) {
        alert(`Conflito com o produto ${produtoConflito.name}`);
        return;
      }
    }
    produtos.push(newProduct);
    this._storage?.set(this.key, produtos);
  }

  public async getAll(): Promise<Array<Product>> {
    return this?.storage.get('@products');
  }

  public async get(cod: string) {
    const products: Array<Product> = await this.storage.get('@products');
    return products.find((product) => product.cod === cod);
  }
}
