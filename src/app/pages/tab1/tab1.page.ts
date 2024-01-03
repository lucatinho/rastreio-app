import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
export class Tab1Page implements OnInit, AfterViewInit {
  products = new Array<Product>()
  loadStatus = {
    finish: false,
    qtd: 0,
    pass: 0
  }

  constructor(private storageService: StorageService,
              private rastreioService: RastreioService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  getProducts() {
    this.loadStatus = {
      finish: false,
      qtd: 0,
      pass: 0
    }
    this.storageService.getAll().then((produtos) => {
      this.products = produtos;
      this.loadStatus.qtd = this.products.length;
      this.attRastreio();
    });
  }

  viewProduct(produto: Product) {
    console.log(produto);
    this.router.navigate([`${RouteUtils.PAGES.PENDENTES}/rastreio/${produto.cod}`]).then();
  }

  private attRastreio() {
    this.products.forEach((produto) => {
      this.reqRastreio(produto)
    });
  }

  private reqRastreio(produto: Product) {
    this.rastreioService.get(produto.cod).subscribe({
      next: (response) => {
        const index = this.products.indexOf(produto);
        this.products[index].rastreio = response;
        this.loadStatus.pass++;
        this.cdr.detectChanges();
        console.log(this.products);
        console.log(this.loadStatus);
      },
      error: (error) => {
        if (error.status === 429) {
          setTimeout(() => {
            this.reqRastreio(produto);
          }, 300);
        } else {
          this.loadStatus.pass++;
          alert('Erro ao buscar' + error);
        }
      }
    });
  }

  // @ts-ignore
  handleRefresh(event) {
    this.getProducts();
    setTimeout(() => {
      // Any calls to load data go here
      console.log(event);
      event.target.complete();
    }, 2000);
  }

}
