import { ApiPoliticianResponse, PoliticianResponse } from "./types";

export const mapApiToObj = (el: ApiPoliticianResponse): PoliticianResponse => {
  return {
    id: el.id,
    fullName: el.full_name,
    politicalParty: el.political_party,
    politicalPartyForFilter: el.political_party_for_filter,
    gender: el.gender,
    position: el.position,
    positionForFilter: el.position_for_filter,
    institution: el.institution,
    ccaa: el.ccaa,
    baseSalary: el.base_salary,
    salarySupplements: el.salary_supplements,
    extraSalary: el.extra_salary,
    otherDietsAndMentions: el.other_diets_and_mentions,
    triennia: el.triennia,
    monthlyRemuneration: el.monthly_remuneration,
    annualRemuneration: el.annual_remuneration,
    observations: el.observations,
  };
};

export const mapToCamelCase = (obj: any): any => {
  if (typeof obj !== "object") {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(mapToCamelCase);
  }
  if (obj === null) {
    return null;
  }

  const entries = Object.entries(obj);
  const mappedEntries = entries.map(
    ([k, v]) =>
      [
        k
          .toLowerCase()
          .replace(/([-_][a-z])/g, (group) =>
            group.toUpperCase().replace("-", "").replace("_", "")
          ),
        mapToCamelCase(v),
      ] as const
  );
  return Object.fromEntries(mappedEntries);
};
