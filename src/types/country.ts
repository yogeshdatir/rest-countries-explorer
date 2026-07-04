export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha3Code: string;
  alpha2Code: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  area: number;
  flags: { svg: string; png: string };
  currencies: { code: string; name: string; symbol: string }[];
  languages: {
    iso639_1: string;
    iso639_2: string;
    name: string;
    nativeName: string;
  }[];
  borders: string[];
  nativeName: string;
}
