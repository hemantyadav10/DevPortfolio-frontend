import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchRecentEndorsements, getSkillEndorsements } from "./api";
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

const useRecentEndorsements = ({ userId, limit = 3 }) => {
  return useQuery({
    queryKey: endorsementQueryKeys.recent(userId, limit),
    queryFn: () => fetchRecentEndorsements({ userId, limit }),
    enabled: !!userId,
  });
};

export {
  useSkillEndorsements,
  useRecentEndorsements
}