import FilterBar from '@/features/countries/components/FilterBar';
import CountryList from '@/features/countries/components/CountryList';
import { useOutletContext } from 'react-router';
import type { CountriesData } from '@/features/countries/components/hooks/useCountries';

const CountriesListPage = () => {
  const {
    countries,
    loading,
    error,
    search,
    handleSearch,
    handleRegionSelect,
  } = useOutletContext<CountriesData>();

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
