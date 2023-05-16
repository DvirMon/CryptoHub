import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routs';
import { provideStore } from '@ngrx/store';


bootstrapApplication(AppComponent, {
    providers: [
    importProvidersFrom(BrowserModule),
    provideRouter(appRoutes),
    provideClientHydration(),
    provideHttpClient(),
    provideAnimations(),
    provideStore()
]
})
  .catch(err => console.error(err));
