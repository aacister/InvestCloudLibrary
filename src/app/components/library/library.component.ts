import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { IApplet } from '../../../interfaces/applet.interface';
import {
  MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
  MatAutocompleteTrigger,
} from '@angular/material/autocomplete';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.css'],
  providers: [
    {
      provide: MAT_AUTOCOMPLETE_DEFAULT_OPTIONS,
      useValue: { overlayPanelClass: 'autocomplete-overlay' },
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent implements OnChanges {
  searchAppletsCtrl = new FormControl();
  filteredCategories: Observable<string[]>;
  filteredApplets: string[] = [];
  categoriesToAppletMap = new Map<string, Set<string>>();
  inputValue: string = '';
  selectedCat: string = '';

  @ViewChild(MatAutocompleteTrigger, { read: MatAutocompleteTrigger })
  searchApplets!: MatAutocompleteTrigger;

  @Input() applets!: IApplet[];
  @Input() categories!: string[];

  constructor() {
    this.filteredCategories = this.searchAppletsCtrl.valueChanges.pipe(
      startWith(null),
      map((value: string | null) => {
        let cats = this._filter(value || '');
        return cats;
      })
    );
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    const { applets, categories } = simpleChanges;
    if (applets) {
      this.applets = applets.currentValue;
      this.buildCategoriesToAppletMap();
    }
    if (categories) {
      this.categories = categories.currentValue;
    }
  }

  onSelectCategory(event: any) {
    //retrieve applets
    const selectedCat = event?.option?.value;
    if (!selectedCat) {
      this.selectedCat = '';
      this.filteredApplets = [];
    } else {
      if (this.categoriesToAppletMap.has(selectedCat.toLowerCase())) {
        this.selectedCat = selectedCat.toLowerCase();
        const appletSet: Set<string> =
          this.categoriesToAppletMap.get(selectedCat.toLowerCase()) ||
          new Set();
        this.filteredApplets = Array.from(appletSet);
      }
    }
  }

  openAutoComplete(): void {
    this.searchApplets.openPanel();
  }

  getAppletCount(cat: string): number {
    const category: string = cat.toLowerCase();
    const appletsSet = this.categoriesToAppletMap.get(category);
    return appletsSet ? appletsSet.size : 0;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.categories.filter((cat) =>
      cat.toLowerCase().includes(filterValue)
    );
  }

  private buildCategoriesToAppletMap() {
    this.categoriesToAppletMap.clear();

    for (const applet of this.applets) {
      for (let cat of applet.categories) {
        cat = cat.toLowerCase();
        if (!this.categoriesToAppletMap.has(cat)) {
          this.categoriesToAppletMap.set(cat, new Set());
        }
        const setVals = this.categoriesToAppletMap.get(cat) || new Set(); //will always have value
        setVals.add(applet.name.toLowerCase());
        this.categoriesToAppletMap.set(cat, setVals);
      }
    }
  }
}
