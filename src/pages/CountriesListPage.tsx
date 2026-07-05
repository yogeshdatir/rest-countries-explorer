import type { Country } from '@/types/country';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import FilterBar from '@/features/countries/components/FilterBar';
import CountryList from '@/features/countries/components/CountryList';
import useFetch from '@/hooks/useFetch';

export interface Filters {
  region: string;
  searchQ: string;
}

const CountriesListPage = () => {
  const [filters, setFilters] = useState<Filters>({
    searchQ: '',
    region: '',
  });
  const debouncedSearchQ = useDebounce(filters.searchQ);

  const { region } = filters;

  const baseUrl = '/api/countries';

  const params = {
    search: debouncedSearchQ,
    region,
  };

  const queryString = new URLSearchParams(params);

  const countriesURL = `${baseUrl}?${queryString}`;
  const { data: countries, loading, error } = useFetch<Country[]>(countriesURL);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchQ: event.target.value }));
  };

  const handleRegionSelect = (value: string) => {
    setFilters((prev) => {
      return { ...prev, region: value };
    });
  };

  return (
    <div className="flex flex-col items-center gap-12 py-12 w-full">
      <FilterBar
        filters={filters}
        countriesLoading={loading}
        handleSearch={handleSearch}
        handleRegionSelect={handleRegionSelect}
      />
      <CountryList countries={countries} loading={loading} error={error} />
    </div>
  );
};

export default CountriesListPage;
