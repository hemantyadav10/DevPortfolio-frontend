import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleEndorsement } from "./api";
import { endorsementQueryKeys } from "./queryKey";
import { statsKeys } from "../stats/queryKeys";
import { skillQueryKeys } from "../skills/queryKey";

export const useToggleEndorsement = ({ userId }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleEndorsement,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:endorsementQueryKeys.all})
      queryClient.invalidateQueries({ queryKey: skillQueryKeys.all});
      queryClient.invalidateQueries({ queryKey: statsKeys.all });
    }
  });
};