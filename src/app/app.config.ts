import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ColorChangerComponent } from './color-changer/color-changer.component';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(BrowserModule),
    provideRouter([
      { path: '', component: AppComponent },
      { path: 'color-changer', component: ColorChangerComponent },
    ]),
  ],
};
