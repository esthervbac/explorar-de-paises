import { Component, inject, input } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Country } from '../../models/country.model';
import { FavoritesService } from '../../services/favorites';

@Component({
  selector: 'app-country-card',
  standalone: true,
  imports: [DecimalPipe, RouterLink],
  templateUrl: './country-card.html',
})
export class CountryCard {
  country = input.required<Country>();
  favoritesService = inject(FavoritesService);

  onToggleFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favoritesService.toggleFavorite(this.country().cca3);
  }
}
