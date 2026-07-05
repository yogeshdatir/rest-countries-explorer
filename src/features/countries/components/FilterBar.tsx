import { useEffect, useState, type ChangeEvent } from 'react';
import { SearchInput } from '@/components/common/SearchInput';
import SelectField from '@/components/common/SelectField';
import type { Filters } from '@/pages/CountriesListPage';
import { containerClasses } from '@/components/layout/Layout';

interface FilterOptions {
  regions: string[];
}

type Props = {
  filters: Filters;
  countriesLoading: boolean;
  handleSearch: (event: ChangeEvent<HTMLInputElement, Element>) => void;
  handleRegionSelect: (value: string) => void;
};

const FilterBar = ({
  filters,
  countriesLoading,
  handleSearch,
  handleRegionSelect,
}: Props) => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(
    null,
  );
  const [filterOptionsLoading, setFilterOptionsLoading] = useState(true);
  const [filterOptionsError, setFilterOptionsError] = useState<string | null>(
    null,
  );

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
  return (
    <section
      className={`flex lg:flex-row gap-10 flex-col justify-between h-auto w-full ${containerClasses}`}
    >
      <SearchInput
        value={filters?.searchQ}
        handleSearch={handleSearch}
        disabled={countriesLoading}
      />
      <SelectField
        value={filters?.region}
        onValueChange={handleRegionSelect}
        selectItems={filterOptions?.regions || []}
        loading={filterOptionsLoading}
        error={filterOptionsError}
        disabled={countriesLoading}
      />
    </section>
  );
};

export default FilterBar;
