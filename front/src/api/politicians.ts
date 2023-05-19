import axios from "axios";
import {
  ApiPaginatedPoliticiansResponse,
  ApiPoliticianResponse,
  PaginatedPoliticiansResponse,
  PaginationParams,
  PoliticianFilters,
  PoliticianUpdateRequest,
} from "./types";
import { mapApiToObj, mapToCamelCase } from "./mappers";

export const getPaginatedPoliticians = async (
  pagination: PaginationParams,
  filters: PoliticianFilters
): Promise<PaginatedPoliticiansResponse> => {
  const limit = pagination.rowsPerPage;
  const skip = pagination.page * pagination.rowsPerPage;

  const { data } = await axios.get<ApiPaginatedPoliticiansResponse>(
    `/api/v1/politicians`,
    {
      params: {
        name: filters.name,
        gender: filters.gender,
        political_party: filters.politicalParty,
        limit,
        skip,
      },
    }
  );

  return {
    data: data.data.map(mapApiToObj),
    total: data.total,
  };
};

export const getPolitician = async (politicianId: string | undefined) => {
  if (!politicianId) return;
  const { data } = await axios.get<ApiPoliticianResponse | undefined>(
    `/api/v1/politicians/${politicianId}`
  );
  if (data) return mapApiToObj(data);
};

export const setPolitician = async (
  politicianId: string,
  payload: PoliticianUpdateRequest
) => {
  const { data } = await axios.patch<ApiPoliticianResponse | undefined>(
    `/api/v1/politicians/${politicianId}`,
    mapToCamelCase(payload)
  );
  if (data) return mapApiToObj(data);
};
