import { TypographyH1 } from '@/components/common/TypographyH1';
import { Skeleton } from '@/components/ui/skeleton';
import useFetch from '@/hooks/useFetch';
import type { Country } from '@/types/country';
import { useParams } from 'react-router';
import DetailsRow from './DetailsRow';
import { useMemo } from 'react';

export type DetailsRowData = {
  label: string;
  value: string | number | undefined;
};

const CountryDetails = () => {
  const { alpha3Code = '' } = useParams();

  // 1. Define your base endpoint and parameters
  const baseUrl = '/api/country';
  const params = {
    alpha3Code,
  };

  // 2. Convert the parameters object into a query string
  const queryString = new URLSearchParams(params).toString();

  const countryDetailsURL = `${baseUrl}?${queryString}`;

  const {
    data: countryDetails,
    loading,
    error,
  } = useFetch<Country>(countryDetailsURL);

  const {
    flags,
    name,
    nativeName,
    population,
    region,
    subregion,
    capital,
    topLevelDomain,
    currencies,
    borders,
    languages,
  } = countryDetails || {};

  const detailsColumn1Data: DetailsRowData[] = useMemo(
    () => [
      {
        label: 'Native Name',
        value: nativeName,
      },
      {
        label: 'Population',
        value: population?.toLocaleString(),
      },
      {
        label: 'Region',
        value: region,
      },
      {
        label: 'Sub Region',
        value: subregion,
      },
      { label: 'Capital', value: capital },
    ],
    [capital, nativeName, population, region, subregion],
  );

  const topLevelDomainString = topLevelDomain?.join(', ');

  const currenciesString = currencies
    ?.map((currency) => currency.name)
    .join(', ');

  const langString = languages?.map((language) => language.name).join(', ');

  const detailsColumn2Data: DetailsRowData[] = useMemo(
    () => [
      {
        label: 'Top Level Domain',
        value: topLevelDomainString,
      },
      {
        label: 'Currencies',
        value: currenciesString,
      },
      {
        label: 'Languages',
        value: langString,
      },
    ],
    [currenciesString, langString, topLevelDomainString],
  );

  if (error) {
    return <div>{error}</div>;
  }

  if (!countryDetails && !loading) {
    return <div>No country found</div>;
  }

  return (
    <div className="flex lg:flex-row flex-col gap-11 lg:gap-30 max-sm:w-[320px]">
      {loading ? (
        <Skeleton className="bg-gray-300 md:w-[560px] lg:w-[416px] xl:w-[560px] md:h-[366px] lg:h-[277px] xl:h-[366px] aspect-video" />
      ) : (
        <img
          src={flags?.png}
          alt={`${name} flag`}
          className="w-[320px] md:w-[560px] object-cover"
        />
      )}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          {loading ? (
            <Skeleton className="bg-gray-300 w-40 h-9" />
          ) : (
            <TypographyH1>{name}</TypographyH1>
          )}
          <div className="flex lg:flex-row flex-col gap-6">
            <div className="flex flex-col leading-loose">
              {detailsColumn1Data.map(({ value, label }: DetailsRowData) => {
                return (
                  <DetailsRow
                    key={label}
                    value={value}
                    label={label}
                    loading={loading}
                  />
                );
              })}
            </div>
            <div className="flex flex-col leading-loose">
              {detailsColumn2Data.map(({ value, label }: DetailsRowData) => {
                return (
                  <DetailsRow
                    key={label}
                    value={value}
                    label={label}
                    loading={loading}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <span className="font-semibold text-nowrap">Border Countries: </span>
          <div className="flex gap-5">
            {borders?.length
              ? borders?.map((border: string) => (
                  <div key={border} className="p-1 px-4 border rounded">
                    {border}
                  </div>
                ))
              : 'None'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
