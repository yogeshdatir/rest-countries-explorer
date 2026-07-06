import type { Country } from '@/types/country';
import { useEffect, useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import FilterBar from '@/features/countries/components/FilterBar';
import CountryList from '@/features/countries/components/CountryList';
import useFetch from '@/hooks/useFetch';
import { useSearchParams } from 'react-router';

const CountriesListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get('search') || '',
  );
  const debouncedSearchQ = useDebounce(search);

  useEffect(() => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);

        if (debouncedSearchQ.trim() === '') newParams.delete('search');
        else newParams.set('search', debouncedSearchQ);

        return newParams;
      },
      {
        replace: true,
      },
    );
  }, [debouncedSearchQ, setSearchParams]);

  const baseUrl = '/api/countries';

  const params = {
    search: debouncedSearchQ,
    region: searchParams.get('region') || '',
  };

  const queryString = new URLSearchParams(params);

  const countriesURL = `${baseUrl}?${queryString}`;
  const { data: countries, loading, error } = useFetch<Country[]>(countriesURL);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const handleRegionSelect = (value: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (value.trim() === '') newParams.delete('region');
      else newParams.set('region', value);

      return newParams;
    });
  };

  return (
    <div className="flex flex-col items-center gap-12 py-12 w-full">
      <FilterBar
        search={search}
        countriesLoading={loading}
        handleSearch={handleSearch}
        handleRegionSelect={handleRegionSelect}
      />
      <CountryList countries={countries} loading={loading} error={error} />
    </div>
  );
};

export default CountriesListPage;
