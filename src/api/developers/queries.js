import { useQuery } from "@tanstack/react-query";
import { fetchAllDevelopers, getDeveloperProfile } from "./api";
import { developersKeys } from "./queryKey";

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

export {
  useDevelopers,
  useDeveloperProfile
};
