import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';
import {
  HammerGestureConfig,
  HammerModule,
  HAMMER_GESTURE_CONFIG
} from "@angular/platform-browser";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { MapsComponent } from './components/maps/maps.component';
import { NavComponent } from './components/nav/nav.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SearchComponent } from './components/search/search.component';
import { SpectacleCardComponent } from './components/spectacle-card/spectacle-card.component';
import { SpectacleDetailsComponent } from './components/spectacle-details/spectacle-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { ArrowTopComponent } from './components/arrow-top/arrow-top.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from './admin/admin.module';
import { OrderModule } from 'ngx-order-pipe';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MaterialModule } from './material/material.module';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import * as Hammer from "hammerjs";

@Injectable()
export class CustomHammerConfig extends HammerGestureConfig {
  // this config is not even used
  overrides = <any>{
    pinch: { enable: false },
    rotate: { enable: false }
  };

  // This method is neccessery
  buildHammer(element: HTMLElement) {
    const mc = new Hammer(element, {
      touchAction: "pan-y"
    });

    return mc;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarouselComponent,
    FilterComponent,
    FooterComponent,
    MapsComponent,
    NavComponent,
    PageNotFoundComponent,
    SearchComponent,
    SpectacleCardComponent,
    SpectacleDetailsComponent,
    AboutusComponent,
    ArrowTopComponent
  ],
  imports: [
    LeafletMarkerClusterModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    AdminModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    FlexLayoutModule,
    NgbModule,
    OrderModule,
    NgxUsefulSwiperModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
