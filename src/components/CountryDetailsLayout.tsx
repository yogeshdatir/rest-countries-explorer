import { Link, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import type { Country } from '@/types/country';
import { Button } from './ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import CountryDetails from './CountryDetails';
import { containerClasses } from '@/App';

const CountryDetailsLayout = () => {
  const { alpha3Code = '' } = useParams();
  const [countryDetails, setCountryDetails] = useState<Country | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    // 1. Define your base endpoint and parameters
    const baseUrl = '/api/country';
    const params = {
      alpha3Code: alpha3Code,
    };

    // 2. Convert the parameters object into a query string
    const queryString = new URLSearchParams(params).toString();

    fetch(`${baseUrl}?${queryString}`, {
      signal: controller.signal,
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch country');
        return res.json();
      })
      .then((data) => {
        setLoading(false);
        setCountryDetails(data);
        setError(null);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return;

        console.error(error);
        setLoading(false);
        setError(
          error instanceof Error ? error.message : 'An unknown error occurred',
        );
      });

    return () => {
      controller.abort();
    };
  }, [alpha3Code]);

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

export default CountryDetailsLayout;
