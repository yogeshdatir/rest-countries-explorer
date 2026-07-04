import type { Country } from '@/types/country';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Link } from 'react-router';

type Props = {
  countries: Country[] | null;
  loading: boolean;
  error: string | null;
};

const CountryList = ({ countries, loading, error }: Props) => {
  if (loading) {
    return (
      <section className="gap-18 grid grid-cols-4 w-7xl">
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
    <section className="gap-18 grid grid-cols-4 w-7xl">
      {countries?.map((country: Country) => {
        return (
          <Link key={country.name} to={`/${country.alpha3Code}`}>
            <Card className="rounded-[5px] w-[264px] h-[336px]">
              <img
                src={country.flags.png}
                alt="Event cover"
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
