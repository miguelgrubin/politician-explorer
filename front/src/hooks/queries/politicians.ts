import { useQuery } from "react-query";
import { getPaginatedPoliticians, getPolitician } from "../../api/politicians";
import { PaginationParams, PoliticianFilters } from "../../api/types";

export const usePaginatedPoliticians = (
  pagination: PaginationParams,
  filters: PoliticianFilters
) => {
  return useQuery(["politicians-paginated", pagination, filters], () =>
    getPaginatedPoliticians(pagination, filters)
  );
};

export const usePolitician = (politicianId: string | undefined) => {
  return useQuery(["politician", politicianId], () =>
    getPolitician(politicianId)
  );
};
