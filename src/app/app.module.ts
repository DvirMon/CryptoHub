
// IMPORTS ANGULAR MODULES
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

// IMPORT SHRED COMPONENTS & ANGULAR MATERIEL MODULES
import { SharedModule } from './shared/shared.module';

// IMPORT COMPONENTS
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/root/app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    PageNotFoundComponent,
    HomeComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
