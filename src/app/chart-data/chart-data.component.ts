import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RssfeedService } from '../rssfeed.service';

import * as moment from 'moment';
import { ChartOptions, ChartTooltipItem } from 'chart.js';

@Component({
  selector: 'chart-data',
  templateUrl: './chart-data.component.html',
  styleUrls: ['./chart-data.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ChartDataComponent implements OnInit {
  public rawData = [];
  public data = {
    lineChartData: [],
    lineChartLabels: [],
    lineChartOptions: {
      responsive: true,
      tooltips: {
        mode: 'index',
        intersect: false,
        aspectRatio: 1
      },
      scales: {
        xAxes: [
          {
            ticks: {
              callback: function(value, index, values) {
                return moment(value).format('DD.MM `YY');
              },
              autoSkip: true,
              mirror: true
            }
          }
        ],
        yAxes: [
          {
            scaleLabel: {
              display: true,
              fontSize: 35,
              labelString: 'Стойност'
            },
            id: 'left'
          },
          {
            scaleLabel: {
              display: true,
              labelString: 'Обем',
              fontSize: 35
            },
            id: 'right',
            type: 'linear',
            position: 'right'
          }
        ]
      }
    },
    lineChartColors: [
      {
        borderColor: 'black',
        backgroundColor: 'transparent',
        radius: 1,
        borderWidth: 0.6,
        hitRadius: 3,
        tension: 0
      },
      {
        borderColor: 'red',
        backgroundColor: 'transparent',
        radius: 1,
        borderWidth: 0.6,
        hitRadius: 3,
        tension: 0
      },
      {
        borderColor: 'red',
        backgroundColor: 'rgba(0,0,200, 0.5)'
      }
    ],
    lineChartLegend: true,
    lineChartType: 'line'
  };

  public volumes;
  public ready = false;

  constructor(private rss: RssfeedService) {}

  ngOnInit(): void {
    this.rss.getData({}).subscribe((data: Array<any>) => {
      console.log(data);
      const result = [];
      const map = new Map();
      for (const item of data) {
        if (!map.has(item.date)) {
          map.set(item.date, true);
          result.push(item);
        }
      }
      this.rawData = data;
      this.rawData = result.sort(
        (a, b) => moment(a.date).valueOf() - moment(b.date).valueOf()
      );

      this.setupdata();
    });
  }

  private setupdata() {
    const closePrices = { data: [], label: 'Цена на затваряне', type: 'line' };
    const avrgPrices = {
      data: [],
      label: 'Среднопретеглена цена',
      type: 'line',
      order: 1
    };
    const volumes = {
      data: [],
      label: 'Обем',
      yAxisID: 'right',
      type: 'bar',
      order: 2
    };
    const labels = [];
    for (const entry of this.rawData) {
      if (moment(entry.date).isBetween(moment('12/31/2018'), moment.now())) {
        console.log(moment(entry.date).toLocaleString());
        volumes.data.push(entry.dailyVolume);
        closePrices.data.push({ y: entry.closePrice, x: new Date(entry.date) });
        avrgPrices.data.push({ y: entry.avrgPrice, x: new Date(entry.date) });
        labels.push(new Date(entry.date).toDateString());
      }
    }
    this.data.lineChartData = [closePrices, avrgPrices, volumes];
    this.data.lineChartLabels = labels;
    this.ready = true;
  }
}
