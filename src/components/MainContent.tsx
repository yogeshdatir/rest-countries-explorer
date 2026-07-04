import type { Country } from '@/types/country';
import { useEffect, useState } from 'react';
import CountryList from './CountryList';
import useDebounce from '@/hooks/useDebounce';
import FilterBar from './FilterBar';

export interface Filters {
  region: string;
  searchQ: string;
}

const MainContent = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [countriesLoading, setCountriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<Filters>({
    searchQ: '',
    region: '',
  });
  const debouncedSearchQ = useDebounce(filters.searchQ);

  const { region } = filters;

  useEffect(() => {
    const countriesController = new AbortController();

    fetch(`/api/countries?search=${debouncedSearchQ}&region=${region}`, {
      signal: countriesController.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch countries');
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setCountriesLoading(false);
        setCountries(data);
        setError(null);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return;

        console.error('Fetch failed:', error);
        setCountriesLoading(false);
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred',
        );
      });

    return () => {
      countriesController.abort();
    };
  }, [debouncedSearchQ, region]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchQ: event.target.value }));
  };

  const handleRegionSelect = (value: string) => {
    setFilters((prev) => {
      return { ...prev, region: value };
    });
  };

  return (
    <main className="flex flex-col items-center gap-12 py-12 w-full">
      <FilterBar
        filters={filters}
        countriesLoading={countriesLoading}
        handleSearch={handleSearch}
        handleRegionSelect={handleRegionSelect}
      />
      <CountryList
        countries={countries}
        loading={countriesLoading}
        error={error}
      />
    </main>
  );
};

export default MainContent;
