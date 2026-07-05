import { TypographyH1 } from '@/components/common/TypographyH1';
import { Skeleton } from '@/components/ui/skeleton';
import type { Country } from '@/types/country';

type Props = {
  countryDetails: Country | null;
  loading: boolean;
  error: string | null;
};

const CountryDetails = ({ countryDetails, loading, error }: Props) => {
  if (loading) {
    return (
      <div className="flex lg:flex-row flex-col gap-11 lg:gap-30 max-sm:w-[320px]">
        <Skeleton className="bg-gray-300 md:w-[560px] lg:w-[416px] xl:w-[560px] md:h-[366px] lg:h-[277px] xl:h-[366px] aspect-video" />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6">
            <Skeleton className="bg-gray-300 w-40 h-9" />
            <div className="flex lg:flex-row flex-col gap-6">
              <div className="flex flex-col leading-loose">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-nowrap">
                    Native Name:{' '}
                  </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-nowrap">
                    Population:{' '}
                  </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-nowrap">Region: </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-nowrap">
                    Sub Region:{' '}
                  </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-nowrap">Capital: </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </div>
              </div>
              <div className="flex flex-col leading-loose">
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-nowrap">
                    Top Level Domain:{' '}
                  </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </div>{' '}
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-nowrap">
                    Currencies:{' '}
                  </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </div>{' '}
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-nowrap">Languages: </span>
                  <Skeleton className="bg-gray-300 w-20 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <span className="font-semibold text-nowrap">
              Border Countries:{' '}
            </span>
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
                <span className="font-semibold text-nowrap">Native Name: </span>
                {countryDetails?.nativeName}
              </span>
              <span>
                <span className="font-semibold text-nowrap">Population: </span>
                {countryDetails?.population}
              </span>
              <span>
                <span className="font-semibold text-nowrap">Region: </span>
                {countryDetails?.region}
              </span>
              <span>
                <span className="font-semibold text-nowrap">Sub Region: </span>
                {countryDetails?.subregion}
              </span>
              <span>
                <span className="font-semibold text-nowrap">Capital: </span>
                {countryDetails?.capital}
              </span>
            </div>
            <div className="flex flex-col leading-loose">
              <span>
                <span className="font-semibold text-nowrap">
                  Top Level Domain:{' '}
                </span>
                {countryDetails?.topLevelDomain?.join(', ')}
              </span>
              <span>
                <span className="font-semibold text-nowrap">Currencies: </span>
                {countryDetails?.currencies
                  ?.map((currency) => currency.name)
                  .join(', ')}
              </span>
              <span>
                <span className="font-semibold text-nowrap">Languages: </span>
                {countryDetails?.languages
                  ?.map((language) => language.name)
                  .join(', ')}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <span className="font-semibold text-nowrap">Border Countries: </span>
          <div className="flex gap-5">
            {countryDetails?.borders?.map((border: string) => (
              <div key={border} className="p-1 px-4 border rounded">
                {border}
              </div>
            )) ?? 'None'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
