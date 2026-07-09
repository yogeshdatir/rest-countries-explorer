import type { Country } from '@/types/country';
import { containerClasses } from '@/components/layout/Layout';
import CountryListSkeleton from './CountryListSkeleton';
import CountryCard from './CountryCard';

type Props = {
  countries: Country[] | null;
  loading: boolean;
  error: string | null;
  isPending: boolean;
};

const CountryList = ({ countries, loading, error, isPending }: Props) => {
  if (error) {
    return <div>{error}</div>;
  }

  if (!countries?.length && !loading) {
    return <div>No countries found.</div>;
  }

  return (
    <section
      className={`max-sm:gap-10 sm:gap-5 md:gap-10 xl:gap-18 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${containerClasses} place-items-center transition-opacity duration-200 ${
        isPending ? 'opacity-60' : 'opacity-100'
      }`}
    >
      {loading ? (
        <CountryListSkeleton />
      ) : (
        countries?.map((country: Country) => (
          <CountryCard key={country.alpha3Code} country={country} />
        ))
      )}
    </section>
  );
};

export default CountryList;
