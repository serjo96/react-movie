export interface CompanyDetails {
  description: string;
  headquarters: string;
  homepage: string;
  id: string | number;
  logoPath: string;
  name: string;
  originCountry: string;
  parentCompany?: {
    id?: string | number;
    name?: string;
    logoPath?: string;
  };
}
