import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { switchMap } from 'rxjs';
import { CountryService } from '../../services/country';
import { FavoritesService } from '../../services/favorites'; // 1. Importe aqui
import { Country } from '../../models/country.model';

@Component({
  selector: 'app-country-detail',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './country-detail.html',
})
export class CountryDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private countryService = inject(CountryService);
  favoritesService = inject(FavoritesService); // 2. Injete aqui (sem 'private', para o HTML acessar)

  country = signal<Country | null>(null);
  borderCountries = signal<Country[]>([]);
  loading = signal<boolean>(true);
  error = signal<boolean>(false);

  languagesList = computed(() => {
    const langs = this.country()?.languages;
    return langs ? Object.values(langs).join(', ') : 'Não informado';
  });

  currenciesList = computed(() => {
    const curr = this.country()?.currencies;
    return curr
      ? Object.values(curr)
          .map((c) => `${c.name} (${c.symbol})`)
          .join(', ')
      : 'Não informado';
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.loading.set(true);
          this.error.set(false);
          const name = params.get('name') || '';
          return this.countryService.getCountryByName(name);
        }),
      )
      .subscribe({
        next: (data) => {
          this.country.set(data);
          this.loading.set(false);

          if (data.borders?.length) {
            this.countryService.getBorderCountries(data.borders).subscribe((neighbors) => {
              this.borderCountries.set(neighbors);
            });
          } else {
            this.borderCountries.set([]);
          }
        },
        error: () => {
          this.error.set(true);
          this.loading.set(false);
        },
      });
  }
}
