// API typing

export interface ApiPoliticianResponse {
  id: string;
  full_name: string;
  political_party: string;
  political_party_for_filter: string;
  gender: string;
  position: string;
  position_for_filter: string;
  institution: string;
  ccaa: string;
  base_salary: number;
  salary_supplements: number;
  extra_salary: number;
  other_diets_and_mentions: number;
  triennia: number;
  monthly_remuneration: number;
  annual_remuneration: number;
  observations: string;
}

export interface ApiPaginatedPoliticiansResponse {
  total: number;
  data: ApiPoliticianResponse[];
}

// Response Objects

export interface PoliticianFilters {
  name: string;
  gender: string;
  politicalParty: string;
}

export interface PaginationParams {
  page: number;
  rowsPerPage: number;
}

export interface PoliticianResponse {
  id: string;
  fullName: string;
  politicalParty: string;
  politicalPartyForFilter: string;
  gender: string;
  position: string;
  positionForFilter: string;
  institution: string;
  ccaa: string;
  baseSalary: number;
  salarySupplements: number;
  extraSalary: number;
  otherDietsAndMentions: number;
  triennia: number;
  monthlyRemuneration: number;
  annualRemuneration: number;
  observations: string;
}

export type PoliticianUpdateRequest = Omit<Partial<PoliticianResponse>, "id">;

export interface PaginatedPoliticiansResponse {
  total: number;
  data: PoliticianResponse[];
}
