import type { Country } from '@/types/country';
import { Link } from 'react-router';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { containerClasses } from '@/components/layout/Layout';

type Props = {
  countries: Country[] | null;
  loading: boolean;
  error: string | null;
};

const CountryList = ({ countries, loading, error }: Props) => {
  if (loading) {
    return (
      <section
        className={`max-sm:gap-10 sm:gap-10 md:gap-13 xl:gap-18 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${containerClasses}`}
      >
        {new Array(12).fill(null).map((_, index) => (
          <Skeleton
            key={index}
            className="bg-gray-300 rounded-[5px] w-[264px] h-[336px]"
          />
        ))}
      </section>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (countries?.length === 0) {
    return <div>No countries found.</div>;
  }

  return (
    <section
      className={`max-sm:gap-10 sm:gap-5 md:gap-10 xl:gap-18 grid xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${containerClasses} place-items-center`}
    >
      {countries?.map((country: Country) => {
        return (
          <Link key={country.name} to={`/${country.alpha3Code}`}>
            <Card className="hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] rounded-[5px] w-[264px] h-[336px] hover:scale-105 transition duration-200 ease-in-out">
              <img
                src={country.flags.png}
                alt={`${country.name} flag`}
                className="w-full h-[160px] rounder-tr-0"
              />
              <CardHeader>
                <CardTitle className="font-bold">{country.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  <span className="font-semibold">Population: </span>
                  <span>{country.population.toLocaleString()}</span>
                </p>
                <p>
                  <span className="font-semibold">Region: </span>
                  <span>{country.region}</span>
                </p>
                <p>
                  <span className="font-semibold">Capital: </span>
                  <span>{country.capital}</span>
                </p>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </section>
  );
};

export default CountryList;
