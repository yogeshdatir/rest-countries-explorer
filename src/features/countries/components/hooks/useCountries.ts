import { API_ENDPOINTS, getApiUrl } from '@/config/api';
import useFetch from '@/hooks/useFetch';
import type { Country } from '@/types/country';
import {
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from 'react';
import { useSearchParams } from 'react-router';

export interface CountriesData {
  countries: Country[] | null;
  loading: boolean;
  error: string | null;
  handleSearch: (value: string) => void;
  handleRegionSelect: (value: string) => void;
  search: string;
  isPending: boolean;
}

const useCountries = (): CountriesData => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(
    searchParams.get('search') || '',
  );
  const [isPending, startTransition] = useTransition();

  // Input stays instantly responsive; only the derived filtered list lags
  const deferredSearch = useDeferredValue(search);

  // Sync search to URL (kept separate from filtering itself)
  useEffect(() => {
    setSearchParams(
      (prev) => {
        const newParams = new URLSearchParams(prev);

        if (deferredSearch.trim() === '') newParams.delete('search');
        else newParams.set('search', deferredSearch);

        return newParams;
      },
      {
        replace: true,
      },
    );
  }, [deferredSearch, setSearchParams]);

  // Fetch once — full dataset, no query params
  const apiUrl = getApiUrl(API_ENDPOINTS.COUNTRIES);
  const { data: allCountries, loading, error } = useFetch<Country[]>(apiUrl);

  const region = searchParams.get('region') || '';

  // Client-side filtering — synchronous, no flash, survives navigation
  const countries = useMemo(() => {
    if (!allCountries) return null;

    return allCountries.filter((country) => {
      const matchesSearch = country.name
        .toLowerCase()
        .includes(deferredSearch.toLowerCase());
      const matchesRegion =
        region === '' || country.region.toLowerCase() === region.toLowerCase();
      return matchesSearch && matchesRegion;
    });
  }, [allCountries, deferredSearch, region]);

  const handleSearch = (value: string) => {
    setSearch(value); // urgent update — input stays responsive
  };

  const handleRegionSelect = (value: string) => {
    startTransition(() => {
      setSearchParams((prev) => {
        const newParams = new URLSearchParams(prev);

        if (value.trim() === '') newParams.delete('region');
        else newParams.set('region', value);

        return newParams;
      });
    });
  };

  return {
    countries,
    loading,
    error,
    handleSearch,
    handleRegionSelect,
    search,
    isPending,
  };
};

export default useCountries;
