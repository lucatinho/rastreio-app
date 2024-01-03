import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Tab1Page} from './tab1.page';
import {RastreioPage} from "./rastreio/rastreio.page";

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
  },
  {
    path: 'rastreio/:cod',
    component: RastreioPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {
}
