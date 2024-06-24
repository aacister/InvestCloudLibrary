import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '../../interfaces/data.interface';
import * as assetData from '../../assets/data.json';
import { IApplet } from '../../interfaces/applet.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  data: IData[];
  sdata: IData = <IData>assetData;

  constructor(private http: HttpClient) {
    this.data = [];
  }

  getData(): Observable<any> {
    this.addBigData(this.sdata, 100, 5000);   
    return of(this.sdata);
  }

  addBigData(lib: IData, ncategs: number, napplets: number): void {
    for (var i = 0; i < ncategs; i++) {
      lib.categories.push('Sample Category ' + i);
    }
    var n = lib.categories.length;
    for (var i = 0; i < napplets; i++) {
      var a: IApplet = {
        name: 'CMS' + i,
        categories: [],
      };
      for (var j = 0; j < Math.floor(Math.random() * 10); ++j) {
        var idx = Math.floor(Math.random() * n) % n;
        a.categories.push(lib.categories[idx]);
      }
      lib.applets.push(a);
    }
  }
}
