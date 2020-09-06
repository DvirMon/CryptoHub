
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
import { BarComponent } from './components/bar/bar.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BarComponent,
    HeaderComponent,
    AboutComponent,
    PageNotFoundComponent,
    HomeComponent
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
