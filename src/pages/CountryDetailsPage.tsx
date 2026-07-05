import { Link, useParams } from 'react-router';
import type { Country } from '@/types/country';
import { ArrowLeftIcon } from 'lucide-react';
import CountryDetails from '@/features/countries/components/CountryDetails';
import { Button } from '@/components/ui/button';
import { containerClasses } from '@/components/layout/Layout';
import useFetch from '@/hooks/useFetch';

const CountryDetailsPage = () => {
  const { alpha3Code = '' } = useParams();

  // 1. Define your base endpoint and parameters
  const baseUrl = '/api/country';
  const params = {
    alpha3Code: alpha3Code,
  };

  // 2. Convert the parameters object into a query string
  const queryString = new URLSearchParams(params).toString();

  const countryDetailsURL = `${baseUrl}?${queryString}`;

  const {
    data: countryDetails,
    loading,
    error,
  } = useFetch<Country>(countryDetailsURL);

  return (
    <div
      className={`flex flex-col lg:gap-20 gap-11 lg:pt-20 pt-11 pb-10 ${containerClasses}`}
    >
      <Link to="/">
        <Button variant="outline" className="px-4 max-w-max">
          <ArrowLeftIcon />
          Back
        </Button>
      </Link>
      <CountryDetails
        countryDetails={countryDetails}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default CountryDetailsPage;
