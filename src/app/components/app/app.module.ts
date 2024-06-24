import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppComponent } from './app.component';
import { DataService } from '../../services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { LibraryComponent } from '../library/library.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, LibraryComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatBadgeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AsyncPipe,
    NgbModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
