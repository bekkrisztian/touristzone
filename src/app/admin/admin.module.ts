import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './admin-components/login/login.component';
import { AdminRoutingModule } from './admin-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { SpectacleListComponent } from './admin-components/spectacles/spectacle-list/spectacle-list.component';
import { SpectacleAddComponent } from './admin-components/spectacles/spectacle-add/spectacle-add.component';
import { NgxEditorModule } from 'ngx-editor';
import { SpectacleSourceComponent } from './admin-components/spectacles/spectacle-source/spectacle-source.component';
import { SpectacleEditComponent } from './admin-components/spectacles/spectacle-edit/spectacle-edit.component';
import { CountryListComponent } from './admin-components/countries/country-list/country-list.component';
import { CountryAddComponent } from './admin-components/countries/country-add/country-add.component';
import { CountryEditComponent } from './admin-components/countries/country-edit/country-edit.component';
import { CountryFlagComponent } from './admin-components/countries/country-flag/country-flag.component';
import { CountyListComponent } from './admin-components/counties/county-list/county-list.component';
import { CountyAddComponent } from './admin-components/counties/county-add/county-add.component';
import { CountyEditComponent } from './admin-components/counties/county-edit/county-edit.component';
import { OpinionsComponent } from './admin-components/opinions/opinions.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../service/auth.interceptor';
import { PinListComponent } from './admin-components/pins/pin-list/pin-list.component';
import { PinAddComponent } from './admin-components/pins/pin-add/pin-add.component';


@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    SpectacleListComponent,
    SpectacleAddComponent,
    SpectacleSourceComponent,
    SpectacleEditComponent,
    CountryListComponent,
    CountryAddComponent,
    CountryEditComponent,
    CountryFlagComponent,
    CountyListComponent,
    CountyAddComponent,
    CountyEditComponent,
    OpinionsComponent,
    PinListComponent,
    PinAddComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgxEditorModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }]
})
export class AdminModule { }
