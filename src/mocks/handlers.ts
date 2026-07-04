import { http, HttpResponse, delay } from 'msw';
import countriesData from './data/countries.json';
import type { Country } from '@/types/country';

const countries = countriesData as Country[];

export const handlers = [
  http.get('/api/countries', async ({ request }) => {
    await delay(400);

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

  http.get('/api/filterOptions', async () => {
    await delay(300);
    const regionsSet = new Set<string>();
    countries?.forEach((country: Country) => {
      regionsSet.add(country.region);
    });

    return HttpResponse.json({ regions: Array.from(regionsSet) });
  }),

  http.get('/api/country', async ({ request }) => {
    await delay(300);
    const url = new URL(request.url);

    // Given a request url of "/?alpha3Code=1",
    // the `alpha3Code` will be a "1" string.
    const alpha3Code = url.searchParams.get('alpha3Code');

    if (!alpha3Code) {
      return new HttpResponse(null, { status: 404 });
    }

    const country = countries.find((country: Country) => {
      return country.alpha3Code === alpha3Code;
    });

    return HttpResponse.json(country);
  }),
];
