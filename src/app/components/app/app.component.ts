import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { IData } from '../../../interfaces/data.interface';
import { catchError, from, map, of, take } from 'rxjs';
import { IApplet } from '../../../interfaces/applet.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  public sData: IData = {
    categories: [],
    applets: [],
  };
  public categories: string[] = [];
  public applets: IApplet[] = [];
  public err: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getData()
      .pipe(
        take(1),
        catchError((err) => {
          this.err = err;
          return of({
            error: err,
          });
        })
      )
      .subscribe((data: any) => {
        this.sData = <IData>data;
      });
  }
}
