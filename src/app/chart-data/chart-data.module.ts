import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartDataComponent } from './chart-data.component';
import { RssfeedService } from '../rssfeed.service';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [ChartDataComponent],
  exports: [ChartDataComponent],
  imports: [CommonModule, ChartsModule],
  providers: [RssfeedService]
})
export class ChartDataModule {}
