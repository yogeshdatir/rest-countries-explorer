import { http, HttpResponse, delay } from 'msw';
import { API_BASE_URL, API_ENDPOINTS } from '../config/api.js';
import countriesData from './data/countries.json';
import type { Country } from '@/types/country';

const countries = countriesData as Country[];

export const handlers = [
  http.get(`${API_BASE_URL}${API_ENDPOINTS.COUNTRIES}`, async ({ request }) => {
    await delay(100);

    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.toLowerCase() ?? '';
    const region = url.searchParams.get('region')?.toLowerCase() ?? '';

    let result = countries;

    if (search) {
      result = result.filter((c) => c.name.toLowerCase().includes(search));
    }

    if (region) {
      result = result.filter((c) => c.region.toLowerCase() === region);
    }

    if (search === 'error-test') {
      return HttpResponse.json(
        { message: 'Internal server error' },
        { status: 500 },
      );
    }

    return HttpResponse.json(result);
  }),

  http.get(`${API_BASE_URL}${API_ENDPOINTS.FILTER_OPTIONS}`, async () => {
    const regionsSet = new Set<string>();
    countries?.forEach((country: Country) => {
      if (country.region) {
        regionsSet.add(country.region);
      }
    });

    return HttpResponse.json({ regions: Array.from(regionsSet) });
  }),

  http.get(
    `${API_BASE_URL}${API_ENDPOINTS.COUNTRY_DETAILS}`,
    async ({ request }) => {
      const url = new URL(request.url);
      const alpha3Code = url.searchParams.get('alpha3Code');

      if (!alpha3Code) {
        return new HttpResponse(null, { status: 404 });
      }

      const country = countries.find(
        (c: Country) => c.alpha3Code === alpha3Code,
      );
      return HttpResponse.json(country);
    },
  ),
];
