import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs";
import {Evento} from "../models/rastreio.model";

@Injectable({
  providedIn: 'root'
})
export class RastreioService {
  private user = 'teste';
  private token = '1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f';

  reloading: EventEmitter<boolean> = new EventEmitter();

  constructor(private http: HttpClient) {
  }

  reloadingEvent(actice: boolean): void {
    this.reloading.emit(actice);
  }

  get(cod: string) {
    return this.http.get<any>(`${environment.baseApi}/rastreio/${cod}`).pipe(map((response) => {
      // const html = document.createElement('div');
      // html.innerHTML = response.html;
      //
      // const writingLinks: HTMLAnchorElement[] = Array.from(
      //   html.querySelectorAll('.linha_status'),
      // );
      // const eventos: Evento[] = new Array<Evento>;
      // writingLinks.map(link => {
      //   const arrayHtml = Array.from(link.children);
      //
      //   let eventObj: Evento = new Evento();
      //   arrayHtml.forEach((elementHtml) => {
      //     if (elementHtml.textContent?.match('Status')) {
      //       eventObj.status = elementHtml.textContent.replace('Status: ', '');
      //     } else if (elementHtml.textContent?.match('Data')) {
      //       eventObj.data = elementHtml.textContent.replace('Data  : ', '').replace('| Hora: ', '');
      //     } else if (elementHtml.textContent?.match('Local')) {
      //       eventObj.local = elementHtml.textContent.replace('Local: ', '');
      //     } else if (elementHtml.textContent?.match('Origem')) {
      //       eventObj.origem = elementHtml.textContent.replace('Origem: ', '');
      //     } else if (elementHtml.textContent?.match('Destino')) {
      //       eventObj.destino = elementHtml.textContent.replace('Destino: ', '');
      //     }
      //   });
      //   eventos.push(eventObj);
      // });
      // return eventos;
      return response;
    }));
  }
}
