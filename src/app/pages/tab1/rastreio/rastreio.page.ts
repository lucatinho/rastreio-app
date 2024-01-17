import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../../services/storage.service";
import {RastreioService} from "../../../services/rastreio.service";
import {ActivatedRoute, Router} from "@angular/router";
import {RouteUtils} from "../../../shared/utils/route.utils";
import {Product} from "../../../models/product.model";
import {Evento} from "../../../models/rastreio.model";

@Component({
  selector: 'app-rastreio',
  templateUrl: './rastreio.page.html',
  styleUrls: ['./rastreio.page.scss'],
})
export class RastreioPage implements OnInit {
  cod = this.route.snapshot.paramMap.get('cod');
  product = new Product();
  loading = true;
  eventos: Evento[] = new Array<Evento>;

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

        const html = document.createElement('div');
        html.innerHTML = response.html;

        const writingLinks: HTMLAnchorElement[] = Array.from(
          html.querySelectorAll('.linha_status'),
        );
        writingLinks.map(link => {
          const arrayHtml = Array.from(link.children);

          let eventObj: Evento = new Evento();
          arrayHtml.forEach((elementHtml) => {
            if (elementHtml.textContent?.match('Status')) {
              eventObj.status = elementHtml.textContent.replace('Status: ', '');
            } else if (elementHtml.textContent?.match('Data')) {
              eventObj.data = elementHtml.textContent.replace('Data  : ', '').replace('| Hora: ', '');
            } else if (elementHtml.textContent?.match('Local')) {
              eventObj.local = elementHtml.textContent.replace('Local: ', '');
            } else if (elementHtml.textContent?.match('Origem')) {
              eventObj.origem = elementHtml.textContent.replace('Origem: ', '');
            } else if (elementHtml.textContent?.match('Destino')) {
              eventObj.destino = elementHtml.textContent.replace('Destino: ', '');
            }
          });
          this.eventos.push(eventObj);
        });

        this.loading = false;
      },
      error: (error) => {
        alert('Erro ao buscar' + error);
      }
    });
  }

  back(): void {
    this.router.navigate([RouteUtils.PAGES.PENDENTES]).then();
  }

}
