import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CountyEditComponent } from './admin-components/counties/county-edit/county-edit.component';
import { CountyListComponent } from './admin-components/counties/county-list/county-list.component';
import { CountryEditComponent } from './admin-components/countries/country-edit/country-edit.component';
import { CountryFlagComponent } from './admin-components/countries/country-flag/country-flag.component';
import { CountryListComponent } from './admin-components/countries/country-list/country-list.component';
import { DashboardComponent } from './admin-components/dashboard/dashboard.component';
import { LoginComponent } from './admin-components/login/login.component';
import { OpinionsComponent } from './admin-components/opinions/opinions.component';
import { PinListComponent } from './admin-components/pins/pin-list/pin-list.component';
import { SpectacleEditComponent } from './admin-components/spectacles/spectacle-edit/spectacle-edit.component';
import { SpectacleListComponent } from './admin-components/spectacles/spectacle-list/spectacle-list.component';
import { SpectacleSourceComponent } from './admin-components/spectacles/spectacle-source/spectacle-source.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'admin', component: LoginComponent, data: {title: 'TouristZone | Bejelentkezés'}},
  {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, data: {title: 'TouristZone | DASHBOARD'}, children: [
    {path: '', component: SpectacleListComponent},
    {path: 'spectaclelist', component: SpectacleListComponent, data: {title: 'TouristZone | Látványosságok'}},
    {path: 'spectaclelist/:id', component: SpectacleSourceComponent, data: {title: 'TouristZone | Látványosságok'}},
    {path: 'spectaclelist/edit/:id', component: SpectacleEditComponent, data: {title: 'TouristZone | Látványosságok'}},
    {path: 'countrylist', component: CountryListComponent, data: {title: 'TouristZone | Országok'}},
    {path: 'countrylist/flag/:id', component: CountryFlagComponent, data: {title: 'TouristZone | Országok'}},
    {path: 'countrylist/edit/:id', component: CountryEditComponent, data: {title: 'TouristZone | Országok'}},
    {path: 'countylist', component: CountyListComponent, data: {title: 'TouristZone | Megyék'}},
    {path: 'countylist/edit/:id', component: CountyEditComponent, data: {title: 'TouristZone | Megyék'}},
    {path: 'opinions', component: OpinionsComponent, data: {title: 'TouristZone | Vélemények'}},
    {path: 'pins', component: PinListComponent, data: {title: 'TouristZone | Pinek'}}
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})

export class AdminRoutingModule { }
