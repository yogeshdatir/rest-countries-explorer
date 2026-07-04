import type { Country } from '@/types/country';
import { TypographyH1 } from './TypographyH1';

type Props = {
  countryDetails: Country | null;
  loading: boolean;
  error: string | null;
};

const CountryDetails = ({ countryDetails, loading, error }: Props) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!countryDetails) {
    return <div>No country found</div>;
  }

  return (
    <div className="flex gap-30">
      <div>
        <img
          src={countryDetails?.flags.png}
          className="w-[560px] object-cover"
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <TypographyH1>{countryDetails?.name}</TypographyH1>
          <div className="flex gap-6">
            <div className="flex flex-col leading-loose">
              <span>Native Name: {countryDetails?.nativeName}</span>
              <span>Population: {countryDetails?.population}</span>
              <span>Region: {countryDetails?.region}</span>
              <span>Sub Region: {countryDetails?.subregion}</span>
              <span>Capital: {countryDetails?.capital}</span>
            </div>
            <div className="flex flex-col">
              <span>Top Level Domain: {countryDetails?.topLevelDomain[0]}</span>
              <span>Currencies: {countryDetails?.currencies?.[0].name}</span>
              <span>Languages: {countryDetails?.languages?.[0].name}</span>
            </div>
          </div>
        </div>

        <div>
          <span>Border Countries: </span>
          <span>{countryDetails?.borders?.[0] ?? 'None'}</span>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
