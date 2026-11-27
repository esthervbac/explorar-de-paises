import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CountryService } from '../../services/country';
import { FavoritesService } from '../../services/favorites';
import { Country } from '../../models/country.model';
import { CountryCard } from '../../components/country-card/country-card';

type SortOption = 'name-asc' | 'name-desc' | 'pop-desc';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountryCard],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  private countryService = inject(CountryService);
  favoritesService = inject(FavoritesService);

  countries = signal<Country[]>([]);
  loading = signal<boolean>(true);
  searchTerm = signal<string>('');
  selectedRegion = signal<string>('');
  onlyFavorites = signal<boolean>(false);
  sortBy = signal<SortOption>('name-asc');

  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  filteredCountries = computed(() => {
    const term = this.searchTerm().toLowerCase().trim();
    const region = this.selectedRegion();
    const favOnly = this.onlyFavorites();
    const favCodes = this.favoritesService.favorites();
    const sort = this.sortBy();

    const filtered = this.countries().filter((country) => {
      const commonName = country?.name?.common?.toLowerCase() || '';
      const matchesName = commonName.includes(term);
      const matchesRegion = region === '' || country?.region === region;
      const matchesFavorite = !favOnly || favCodes.includes(country.cca3);
      return matchesName && matchesRegion && matchesFavorite;
    });

    // [...filtered] cria uma cópia antes do .sort() para não mutar o array original
    return [...filtered].sort((a, b) => {
      if (sort === 'name-desc') {
        return b.name.common.localeCompare(a.name.common, 'pt-BR');
      }
      if (sort === 'pop-desc') {
        return b.population - a.population;
      }
      return a.name.common.localeCompare(b.name.common, 'pt-BR');
    });
  });

  ngOnInit(): void {
    this.countryService.getCountries().subscribe({
      next: (data) => {
        this.countries.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Erro na API:', err);
        this.loading.set(false);
      },
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  onRegionChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedRegion.set(value);
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as SortOption;
    this.sortBy.set(value);
  }

  toggleOnlyFavorites(): void {
    this.onlyFavorites.update((current) => !current);
  }
}
