import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { createCustomElement } from '@angular/elements';
import { RssFeedComponent } from './rss-feed/rss-feed.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ChartDataComponent } from './chart-data/chart-data.component';
import { ChartDataModule } from './chart-data/chart-data.module';

@NgModule({
  declarations: [RssFeedComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, ChartDataModule],
  bootstrap: [ChartDataComponent],
  entryComponents: [ChartDataComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    // const el = createCustomElement(RssFeedComponent, {
    //   injector: this.injector
    // });

    // customElements.define('rss-feed', el);

    const el = createCustomElement(ChartDataComponent, {
      injector: this.injector
    });
    customElements.define('chart-data', el);
  }
}
