/// <reference types="@angular/localize" />

import { Component } from '@angular/core';
import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import 'zone.js';
import { AppModule } from './app/components/app/app.module';
/*
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>
  `,
})
export class App {
  name = 'Angular';
}

//bootstrapApplication(App);
*/
platformBrowser()
  .bootstrapModule(AppModule)
  .catch((e) => console.error(e));
