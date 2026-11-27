import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CountryDetail } from './pages/country-detail/country-detail';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'pais/:name', component: CountryDetail },
  { path: '**', redirectTo: '' },
];
