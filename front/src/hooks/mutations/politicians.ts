import { useMutation } from "react-query";
import { setPolitician } from "../../api/politicians";
import { PoliticianUpdateRequest } from "../../api/types";

export const usePoliticianUpdate = () => {
  return useMutation(
    (data: { politicianId: string; payload: PoliticianUpdateRequest }) =>
      setPolitician(data.politicianId, data.payload)
  );
};
