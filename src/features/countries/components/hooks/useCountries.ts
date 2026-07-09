import { API_ENDPOINTS, getApiUrl } from '@/config/api';
import useDebounce from '@/hooks/useDebounce';
import useFetch from '@/hooks/useFetch';
import type { Country } from '@/types/country';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';

export interface CountriesData {
  countries: Country[] | null;
  loading: boolean;
  error: string | null;
  handleSearch: (value: string) => void;
  handleRegionSelect: (value: string) => void;
  search: string;
}

const useCountries = (): CountriesData => {
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

  const queryFilters = {
    search: debouncedSearchQ,
    region: searchParams.get('region') || '',
  };

  const filterParams = new URLSearchParams(queryFilters);

  const apiUrl = getApiUrl(`${API_ENDPOINTS.COUNTRIES}?${filterParams}`);
  const { data: countries, loading, error } = useFetch<Country[]>(apiUrl);

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
  return {
    countries,
    loading,
    error,
    handleSearch,
    handleRegionSelect,
    search,
  };
};

export default useCountries;
