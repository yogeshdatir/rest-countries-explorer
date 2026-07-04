import type { Country } from '@/types/country';
import { useEffect, useState } from 'react';
import { SearchInput } from './SearchInput';
import SelectField from './SelectField';
import CountryList from './CountryList';

interface Filters {
  region: string;
  searchQ: string;
}

interface FilterOptions {
  regions: string[];
}

const MainContent = () => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null,
  );
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);
  const [filterOptionsError, setFilterOptionsError] = useState<string | null>(
    null,
  );

  const [filters, setFilters] = useState<Filters>({
    searchQ: '',
    region: '',
  });

  const { searchQ, region } = filters;

  useEffect(() => {
    const filterOptionsController = new AbortController();

    fetch(`/api/filterOptions`, {
      signal: filterOptionsController.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch filter options');
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setFilterOptionsLoading(false);
        setFilterOptions(data);
        setFilterOptionsError(null);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return;

        console.error('Fetch failed:', error);
        setFilterOptionsLoading(false);
        setFilterOptionsError(
          error instanceof Error ? error.message : 'An unknown error occurred',
        );
      });

    return () => {
      filterOptionsController.abort();
    };
  }, []);

  useEffect(() => {
    const countriesController = new AbortController();

    fetch(`/api/countries?search=${searchQ}&region=${region}`, {
      signal: countriesController.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch countries');
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setLoading(false);
        setCountries(data);
        setError(null);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return;

        console.error('Fetch failed:', error);
        setLoading(false);
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred',
        );
      });

    return () => {
      countriesController.abort();
    };
  }, [searchQ, region]);

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
      <section className="flex justify-between w-7xl h-[56px]">
        <SearchInput
          value={filters?.searchQ}
          handleSearch={handleSearch}
          disabled={loading}
        />
        <SelectField
          value={filters?.region}
          onValueChange={handleRegionSelect}
          selectItems={filterOptions?.regions || []}
          loading={filterOptionsLoading}
          error={filterOptionsError}
          disabled={loading}
        />
      </section>
      <CountryList countries={countries} loading={loading} error={error} />
    </main>
  );
};

export default MainContent;
