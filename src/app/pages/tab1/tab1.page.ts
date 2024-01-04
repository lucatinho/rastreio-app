import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {RastreioService} from "../../services/rastreio.service";
import {Product} from "../../models/product.model";
import {Router} from "@angular/router";
import {RouteUtils} from "../../shared/utils/route.utils";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  products = new Array<Product>()

  constructor(private storageService: StorageService,
              private rastreioService: RastreioService,
              private router: Router) {
  }

  ngOnInit() {
    this.getProducts();
    this.rastreioService.reloading.subscribe(() => {
      this.getProducts();
    });
  }

  getProducts() {
    this.storageService.getAll().then((produtos) => {
      this.products = produtos;
    });
  }

  viewProduct(produto: Product) {
    this.router.navigate([`${RouteUtils.PAGES.PENDENTES}/rastreio/${produto.cod}`]).then();
  }


  status(product: Product) {
    return product.rastreio?.eventos[0]?.status;
  }

  local(product: Product) {
    return product.rastreio?.eventos?.shift()?.local;
  }

  delete(product: Product): void {
    this.storageService.deleteItem(product.cod).then(() => {
      this.getProducts();
    })
  }

  // @ts-ignore
  handleRefresh(event) {
    this.getProducts();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }

}
