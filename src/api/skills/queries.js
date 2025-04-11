import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { skillQueryKeys } from "./queryKey"
import { getAllUserSkills, getUserSkillsByCategory } from "./api"

const useUserSkillsByCategory = (userId) => {
  return useQuery({
    queryKey: skillQueryKeys.byUserAndCategory(userId),
    queryFn: () => getUserSkillsByCategory({ userId })
  })
}

const usePaginatedUserSkills = ({ userId, limit = 10, currentUser }) => {
  return useInfiniteQuery({
    queryKey: skillQueryKeys.paginatedByUser({ userId, limit, currentUser }),
    queryFn: ({ pageParam = 1 }) => getAllUserSkills({ userId, page: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage || null
    },
    placeholderData: prev => prev,
    enabled: !!userId,
  });
};

export {
  useUserSkillsByCategory,
  usePaginatedUserSkills
}