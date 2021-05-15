import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { HomeComponent } from './components/home/home.component';
import { MapsComponent } from './components/maps/maps.component';
import { NavComponent } from './components/nav/nav.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SpectacleCardComponent } from './components/spectacle-card/spectacle-card.component';
import { SpectacleDetailsComponent } from './components/spectacle-details/spectacle-details.component';
import { SpectacleService } from './service/spectacle.service';

const routes: Routes = [
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path: '', component: NavComponent, children: [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, data: {title: 'TouristZone | Főoldal'}},
    {path: 'spectacles', component: SpectacleCardComponent, data: {title: 'TouristZone | Látványosságok'}},
    {path: 'maps', component: MapsComponent, data: {title: 'TouristZone | Térkép'}},
    {path: 'aboutus', component: AboutusComponent, data: {title: 'TouristZone | Rólunk'}},
    {path: 'country/:id1', component: SpectacleCardComponent, data: {title: 'TouristZone | Látványosságok'}},
    {path: 'county/:id2', component: SpectacleCardComponent, data: {title: 'TouristZone | Látványosságok'}},
    {path: 'spectacles/:id', component: SpectacleDetailsComponent, data: {title: 'TouristZone | Látványosságok'}},
    {path: 'search/:keyword', component: SpectacleCardComponent, data: {title: 'TouristZone | Keresés'}},
    {path: '**', component: PageNotFoundComponent},
  ]},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  providers: [
    SpectacleService
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
