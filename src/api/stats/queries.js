import { useQuery } from "@tanstack/react-query"
import { statsKeys } from "./queryKeys"
import { getPlatformStats } from "./api"

const usePlatformStats = () => (
  useQuery({
    queryKey: statsKeys.platform(),
    queryFn: getPlatformStats
  })
);

export {
  usePlatformStats
}
