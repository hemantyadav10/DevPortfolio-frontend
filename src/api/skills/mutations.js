import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSkill, deleteSkill, updateSkill } from "./api";
import { skillQueryKeys } from "./queryKey";
import { statsKeys } from "../stats/queryKeys";

const useUpdateSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateSkill,
    onSuccess: (_, { skillId }) => {
      console.log('Skill updated')
      queryClient.invalidateQueries({ queryKey: skillQueryKeys.all })
    },
  });
};

const useDeleteSkill = ({ userId }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteSkill,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: skillQueryKeys.all })
      queryClient.invalidateQueries({ queryKey: statsKeys.all });
    }
  });
};

const useAddSkill = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: skillQueryKeys.all })
    }
  })
}

export {
  useUpdateSkill,
  useDeleteSkill,
  useAddSkill
}