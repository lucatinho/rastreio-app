import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {RastreioService} from "../../../services/rastreio.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RouteUtils} from "../../../shared/utils/route.utils";
import {Product} from "../../../models/product.model";
import {Rastreio} from "../../../models/rastreio.model";

@Component({
  selector: 'app-rastreio',
  templateUrl: './rastreio.page.html',
  styleUrls: ['./rastreio.page.scss'],
})
export class RastreioPage implements OnInit {
  cod = this.route.snapshot.paramMap.get('cod');
  product = new Product();
  rastreio = new Rastreio();
  loading = true;

  constructor(private storageService: StorageService,
              private rastreioService: RastreioService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getProduto();
  }

  getProduto() {
    if (this.cod) {
      this.storageService.get(this.cod).then((response) => {
        if (response) {
          this.product = response;
          this.reqRastreio(response);
        } else {
          alert('codigo nao encontrado');
        }
      })
    } else {
      alert('codigo nao encontrado');
    }
  }

  private reqRastreio(produto: Product) {
    this.rastreioService.get(produto.cod).subscribe({
      next: (response) => {
        this.rastreio = response;
        this.loading = false;
      },
      error: (error) => {
        if (error.status === 429) {
          setTimeout(() => {
            this.reqRastreio(produto);
          }, 300);
        } else {
          alert('Erro ao buscar' + error);
        }
      }
    });
  }

  back(): void {
    this.router.navigate([RouteUtils.PAGES.PENDENTES]).then();
  }

}
