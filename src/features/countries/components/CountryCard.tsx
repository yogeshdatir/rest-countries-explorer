import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMemo } from 'react';
import { Link } from 'react-router';
import type { DetailsRowData } from './CountryDetails';
import type { Country } from '@/types/country';
import DetailsRow from './DetailsRow';

type Props = {
  country: Country;
};

const CountryCard = ({ country }: Props) => {
  const { alpha3Code, name, flags, population, region, capital } = country;

  const countryData: DetailsRowData[] = useMemo(
    () => [
      {
        label: 'Population',
        value: population.toLocaleString(),
      },
      {
        label: 'Region',
        value: region,
      },
      { label: 'Capital', value: capital },
    ],
    [capital, population, region],
  );

  return (
    <Link key={name} to={`/${alpha3Code}`}>
      <Card className="hover:shadow-[0_0_20px_5px_rgba(59,130,246,0.7)] rounded-[5px] w-[264px] h-[336px] hover:scale-105 transition-all! duration-200 ease-out">
        <img
          src={flags.png}
          alt={`${name} flag`}
          className="w-full h-[160px] rounder-tr-0"
        />
        <CardHeader>
          <CardTitle className="font-bold">{name}</CardTitle>
        </CardHeader>
        <CardContent>
          {countryData.map(({ value, label }) => {
            return <DetailsRow key={label} value={value} label={label} />;
          })}
        </CardContent>
      </Card>
    </Link>
  );
};

export default CountryCard;
