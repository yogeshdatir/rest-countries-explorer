import type { Country } from '@/types/country';
import { TypographyH1 } from './TypographyH1';
import { Skeleton } from './ui/skeleton';

type Props = {
  countryDetails: Country | null;
  loading: boolean;
  error: string | null;
};

const CountryDetails = ({ countryDetails, loading, error }: Props) => {
  if (loading) {
    return (
      <div className="flex lg:flex-row flex-col gap-11 lg:gap-30 max-sm:w-[320px]">
        <Skeleton className="bg-gray-300 w-[320px] md:w-[560px] h-[213px] aspect-video" />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <Skeleton className="bg-gray-300 w-40 h-9" />
            <div className="flex lg:flex-row flex-col gap-6">
              <div className="flex flex-col leading-loose">
                <p className="flex items-center gap-1">
                  <span className="font-semibold">Native Name: </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </p>
                <p className="flex items-center gap-1">
                  <span className="font-semibold">Population: </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </p>
                <p className="flex items-center gap-1">
                  <span className="font-semibold">Region: </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </p>
                <p className="flex items-center gap-1">
                  <span className="font-semibold">Sub Region: </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </p>
                <p className="flex items-center gap-1">
                  <span className="font-semibold">Capital: </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </p>
              </div>
              <div className="flex flex-col leading-loose">
                <p className="flex items-center gap-1">
                  <span className="font-semibold">Top Level Domain: </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </p>{' '}
                <p className="flex items-center gap-1">
                  <span className="font-semibold">Currencies: </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </p>{' '}
                <p className="flex items-center gap-1">
                  <span className="font-semibold">Languages: </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="font-semibold">Border Countries: </span>
            <Skeleton className="bg-gray-300 w-20 h-4" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!countryDetails) {
    return <div>No country found</div>;
  }

  return (
    <div className="flex lg:flex-row flex-col gap-11 lg:gap-30 max-sm:w-[320px]">
      <div>
        <img
          src={countryDetails?.flags.png}
          className="w-[320px] md:w-[560px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <TypographyH1>{countryDetails?.name}</TypographyH1>
          <div className="flex lg:flex-row flex-col gap-6">
            <div className="flex flex-col leading-loose">
              <span>
                <span className="font-semibold">Native Name: </span>
                {countryDetails?.nativeName}
              </span>
              <span>
                <span className="font-semibold">Population: </span>
                {countryDetails?.population}
              </span>
              <span>
                <span className="font-semibold">Region: </span>
                {countryDetails?.region}
              </span>
              <span>
                <span className="font-semibold">Sub Region: </span>
                {countryDetails?.subregion}
              </span>
              <span>
                <span className="font-semibold">Capital: </span>
                {countryDetails?.capital}
              </span>
            </div>
            <div className="flex flex-col leading-loose">
              <span>
                <span className="font-semibold">Top Level Domain: </span>
                {countryDetails?.topLevelDomain[0]}
              </span>
              <span>
                <span className="font-semibold">Currencies: </span>
                {countryDetails?.currencies?.[0].name}
              </span>
              <span>
                <span className="font-semibold">Languages: </span>
                {countryDetails?.languages?.[0].name}
              </span>
            </div>
          </div>
        </div>

        <div>
          <span className="font-semibold">Border Countries: </span>
          <span>{countryDetails?.borders?.[0] ?? 'None'}</span>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
