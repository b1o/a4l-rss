import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RssfeedService } from '../rssfeed.service';
import { HttpClient } from '@angular/common/http';

import * as xml2js from 'xml2js';

@Component({
  selector: 'rss-feed',
  templateUrl: './rss-feed.component.html',
  styleUrls: ['./rss-feed.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  providers: [HttpClient, RssfeedService]
})
export class RssFeedComponent implements OnInit {
  public title = 'rss feed';
  public urls = [
    { name: 'Trades MIFID2 ', url: 'TradesMIFID2' },
    { name: 'Trades 15min Delay MIFID2 ', url: 'Trades15minDelayMIFID2' },
    { name: 'Best Orders MIFID2 ', url: 'BestOrdersMIFID2' },
    {
      name: 'Best Orders 15min Delay MIFID2 ',
      url: 'BestOrders15minDelayMIFID2'
    },
    { name: 'Issuer Shares ', url: 'IssuerShares' },
    { name: 'Issuer Shares 15min Delay ', url: 'IssuerShares15minDelay' },
    { name: 'Issuer Bonds ', url: 'IssuerBonds' },
    { name: 'Issuer Bonds 15min Delay ', url: 'IssuerBonds15minDelay' },
    { name: 'Short Bulletin ', url: 'ShortBulletin' },
    { name: 'Short Bond ', url: 'ShortBond' },
    { name: 'Indices ', url: 'Indices' },
    { name: 'BG REIT ', url: 'BG REIT' },
    { name: 'CGIX ', url: 'CGIX' },
    { name: 'Tiker ', url: 'Tiker' },
    { name: 'News ', url: 'News' },
    { name: 'APA Reports ', url: 'APAReports' },
    { name: 'Constituents ', url: 'Constituents' },
    { name: 'Close Inf ', url: 'CloseInf' },
    { name: 'Financial Coefficnts ', url: 'FinancialCoefficnts' },
    { name: 'Weightings ', url: 'Weightings' },
    { name: 'Wvap ', url: 'Vwap' },
    { name: 'ReferenceData ', url: 'ReferenceData' },
    { name: 'LiquidityBands ', url: 'LiquidityBands' },
    { name: 'Suspensions & Removals ', url: 'SuspensionsRemovals' },
    { name: 'RTS27 Report 1 ', url: 'RTS27Report1' },
    { name: 'RTS27 Report 2 ', url: 'RTS27Report2' },
    { name: 'RTS27 Report 3 ', url: 'RTS27Report3' },
    { name: 'RTS27 Report 4 ', url: 'RTS27Report4' },
    { name: 'RTS27 Report 5', url: 'RTS27Report5' },
    { name: 'RTS27 Report 6 ', url: 'RTS27Report6' },
    { name: 'RTS27 Report 7 ', url: 'RTS27Report7' },
    { name: 'RTS27 Report 8 ', url: 'RTS27Report8' }
  ];

  public data;
  public err;
  public date;
  public loading = false;

  constructor(private feed: RssfeedService) {}

  ngOnInit(): void {
    this.feed
      .getData({ page: 'Vwap', code: 'A4L', tradedate: this.date })
      .subscribe(data => {});

    // this.feed.getDispatcherData().subscribe(data => console.log(data));
  }

  urlClicked(url) {
    console.log(this.date);
    this.err = null;
    this.loading = true;
    this.feed
      .getData({ page: url, code: 'A4L', tradedate: this.date })
      .subscribe(data => {
        const parseString = xml2js.parseString;

        parseString(data, (err, result) => {
          this.data = result;
          if (err) {
            this.err = 'Cant parse xml, probably no access for the page';
          } else {
            this.err = null;
          }
          this.loading = false;
        });
      });
  }
}
