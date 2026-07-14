export interface Country {
  code: string;
  name: string;
}

export interface Subdivision {
  code: string;
  name: string;
  country_code: string;
}
