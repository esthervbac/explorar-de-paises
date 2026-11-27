import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, shareReplay } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private dataUrl = 'https://raw.githubusercontent.com/mledoze/countries/master/countries.json';

  private countriesCache$?: Observable<Country[]>;

  getCountries(): Observable<Country[]> {
    if (!this.countriesCache$) {
      this.countriesCache$ = this.http.get<any[]>(this.dataUrl).pipe(
        map((items) =>
          items.map((item) => {
            const code = (item.cca2 || '').toLowerCase();
            return {
              cca3: item.cca3 || '',
              name: {
                common: item.translations?.por?.common || item.name?.common || 'Desconhecido',
                official: item.translations?.por?.official || item.name?.official || '',
              },
              flags: {
                svg: `https://flagcdn.com/${code}.svg`,
                alt: `Bandeira de ${item.translations?.por?.common || item.name?.common}`,
              },
              population: item.area ? Math.round(item.area * 50) : 0,
              region: item.region || 'Outros',
              subregion: item.subregion || '',
              capital: item.capital || [],
              languages: item.languages || {},
              currencies: item.currencies || {},
              borders: item.borders || [],
            } as Country;
          }),
        ),
        shareReplay(1),
      );
    }
    return this.countriesCache$;
  }

  getCountryByName(name: string): Observable<Country> {
    const decoded = decodeURIComponent(name).toLowerCase();
    return this.getCountries().pipe(
      map((countries) => {
        const found = countries.find((c) => c.name.common.toLowerCase() === decoded);
        if (!found) throw new Error('País não encontrado');
        return found;
      }),
    );
  }

  getBorderCountries(codes: string[]): Observable<Country[]> {
    return this.getCountries().pipe(
      map((countries) => countries.filter((c) => codes.includes(c.cca3))),
    );
  }
}
