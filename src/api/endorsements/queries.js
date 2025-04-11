import { useInfiniteQuery } from "@tanstack/react-query";
import { getSkillEndorsements } from "./api";
import { endorsementQueryKeys } from "./queryKey";

const useSkillEndorsements = ({ skillId, limit = 5 }) => {
  return useInfiniteQuery({
    queryKey: endorsementQueryKeys.bySkill({ skillId, limit }),
    queryFn: ({ pageParam = 1 }) => getSkillEndorsements({ skillId, page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage || null
    },
    placeholderData: prev => prev,
    enabled: !!skillId,
  });
};

export {
  useSkillEndorsements
}