import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class RssfeedService {
  private url = 'http://rss.bse-sofia.bg/?page=IssuerShares&code=a4l';

  constructor(private http: HttpClient) {}

  getData(params: { [key: string]: string }) {
    return this.http.get('/data/', {
      observe: 'body',
      params: new HttpParams({ fromObject: params }),
      responseType: 'text'
    });
  }

  getDispatcherData() {
    //profilir_14%5Bparameters%5D%5Blanguage%5D: bg
    // profilir_14%5Bparameters%5D%5Bcode%5D: A4L
    // profilir_14%5Bfrequency%5D: 0

    return this.http.post('https://www.bse-sofia.bg/bg/dashboard/dispatcher/', {
      parameters: {
        language: 'bg',
        code: 'A4L'
      },
      frequency: 0
    });
  }
}
