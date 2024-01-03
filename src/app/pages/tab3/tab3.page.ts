import {Component} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {StatusProductType} from "../../enum/statusProduct-type.enum";
import {Router} from "@angular/router";
import {RouteUtils} from "../../shared/utils/route.utils";
import {Product} from "../../models/product.model";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  product = new Product();

  constructor(private storageService: StorageService, private router: Router) {
  }

  salvar(): void {
    this.product.status = StatusProductType.NOVO;
    this.product.data = new Date().getTime();
    this.storageService.set(this.product).then(() => {
      this.navigate();
    });

  }

  navigate(): void {
    this.router.navigate([RouteUtils.PAGES.PENDENTES]).then();
  }

}
