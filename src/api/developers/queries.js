import { useQuery } from "@tanstack/react-query";
import { fetchAllDevelopers, getCurrentUser, getDeveloperProfile, getFeaturedDevelopers } from "./api";
import { developersKeys } from "./queryKey";

export const userKeys = {
  current: ['user', 'current']
};

const useDevelopers = ({
  page = 1,
  limit = 3,
  query = '',
  category = '',
}) => {
  const filters = { page, limit, query, category };
  return useQuery({
    queryKey: developersKeys.list(filters),
    queryFn: () => fetchAllDevelopers(filters),
  })
}

const useDeveloperProfile = (userId) => {
  return useQuery({
    queryKey: developersKeys.profile(userId),
    queryFn: () => getDeveloperProfile(userId),
    enabled: !!userId,
  });
};

const useGetCurrentUser = (userId) => {
  return useQuery({
    queryKey: userKeys.current,
    queryFn: getCurrentUser,
    retry: false,
    staleTime: Infinity,
    enabled: !!userId
  });
};

const useFeaturedDevelopers = () => {
  return useQuery({
    queryKey: developersKeys.featured(),
    queryFn: getFeaturedDevelopers
  })
}

export {
  useDevelopers,
  useDeveloperProfile,
  useGetCurrentUser,
  useFeaturedDevelopers
};
