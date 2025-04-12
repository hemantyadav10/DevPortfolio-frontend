import { useQuery } from "@tanstack/react-query"
import { getDashboardStats } from "./api"

const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboard", "stats"],
    queryFn: getDashboardStats
  })
}

export {
  useDashboardStats
}