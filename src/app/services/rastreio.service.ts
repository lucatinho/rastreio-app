import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Rastreio} from "../models/rastreio.model";

@Injectable({
  providedIn: 'root'
})
export class RastreioService {
  private user = 'teste';
  private token = '1abcd00b2731640e886fb41a8a9671ad1434c599dbaa0a0de9a5aa619f29a83f';

  constructor(private http: HttpClient) {
  }

  get(cod: string) {
    return this.http.get<Rastreio>(`https://api.linketrack.com/track/json?user=${this.user}&token=${this.token}&codigo=${cod}`);
  }
}
