import { type ChangeEvent } from 'react';
import { SearchInput } from '@/components/common/SearchInput';
import SelectField from '@/components/common/SelectField';
import type { Filters } from '@/pages/CountriesListPage';
import { containerClasses } from '@/components/layout/Layout';
import useFetch from '@/hooks/useFetch';

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
  const {
    data: filterOptions,
    loading,
    error,
  } = useFetch<FilterOptions>('/api/filterOptions');

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
        loading={loading}
        error={error}
        disabled={countriesLoading}
      />
    </section>
  );
};

export default FilterBar;
