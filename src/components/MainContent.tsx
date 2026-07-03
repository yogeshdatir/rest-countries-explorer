import type { Country } from '@/types/country';
import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { SearchInput } from './SearchInput';
import SelectField from './SelectField';

interface Filters {
  region: string;
  searchQ: string;
}

const MainContent = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filters, setFilters] = useState<Filters>({
    searchQ: '',
    region: '',
  });

  useEffect(() => {
    const controller = new AbortController();

    fetch('/api/countries', { signal: controller.signal })
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        setCountries(data);
      })
      .catch((error: unknown) => {
        if (error instanceof Error && error.name === 'AbortError') return;

        console.error('Fetch failed:', error);
      });

    return () => {
      controller.abort();
    };
  }, []);

  const regions = useMemo(() => {
    const regionsSet = new Set<string>();
    countries.forEach((country: Country) => {
      return regionsSet.add(country.region);
    });
    return Array.from(regionsSet);
  }, [countries]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchQ: event.target.value }));
  };

  const handleRegionSelect = (value: string) => {
    setFilters((prev) => {
      return { ...prev, region: value };
    });
  };

  return (
    <main className="flex flex-col items-center gap-12 py-12 w-full">
      <section className="flex justify-between w-7xl h-[56px]">
        <SearchInput value={filters?.searchQ} handleSearch={handleSearch} />
        <SelectField
          value={filters?.region}
          onValueChange={handleRegionSelect}
          selectItems={regions}
        />
      </section>
      <section className="gap-18 grid grid-cols-4 w-7xl">
        {countries.map((country: Country) => {
          return (
            <Card
              key={country.name}
              className="rounded-[5px] w-[264px] h-[336px]"
            >
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
          );
        })}
      </section>
    </main>
  );
};

export default MainContent;
