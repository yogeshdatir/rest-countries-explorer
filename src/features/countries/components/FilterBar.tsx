import { SearchInput } from '@/components/common/SearchInput';
import SelectField from '@/components/common/SelectField';
import { containerClasses } from '@/components/layout/Layout';
import { API_ENDPOINTS, getApiUrl } from '@/config/api';
import useFetch from '@/hooks/useFetch';
import { useSearchParams } from 'react-router';

interface FilterOptions {
  regions: string[];
}

type Props = {
  search: string;
  countriesLoading: boolean;
  handleSearch: (value: string) => void;
  handleRegionSelect: (value: string) => void;
};

const FilterBar = ({
  search,
  countriesLoading,
  handleSearch,
  handleRegionSelect,
}: Props) => {
  const [searchParams] = useSearchParams();
  const {
    data: filterOptions,
    loading,
    error,
  } = useFetch<FilterOptions>(getApiUrl(API_ENDPOINTS.FILTER_OPTIONS));

  return (
    <section
      className={`flex lg:flex-row gap-10 flex-col justify-between h-auto w-full ${containerClasses}`}
    >
      <SearchInput
        value={search}
        handleSearch={handleSearch}
        disabled={countriesLoading}
      />
      <SelectField
        value={searchParams.get('region') || ''}
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
