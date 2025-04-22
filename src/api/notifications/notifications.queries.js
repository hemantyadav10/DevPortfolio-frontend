import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { notificationKeys } from "./notifications.keys"
import { getNotifications, getUnreadNotificationCount } from "./notifications.api"

const useNotificationCount = (isAuthenticated) => {
  return useQuery({
    queryKey: notificationKeys.unreadCount(),
    queryFn: getUnreadNotificationCount,
    enabled: isAuthenticated
  })
}

const useAllNotifications = (isAuthenticated, fetch, { limit = 10, read }) => {
  return useInfiniteQuery({
    queryKey: notificationKeys.list({ read, limit }),
    queryFn: ({ pageParam = 1 }) => getNotifications({ page: pageParam, limit, read }),
    getNextPageParam: (lastPage) => {
      return lastPage?.nextPage || null
    },
    placeholderData: prev => prev,
    enabled: isAuthenticated && fetch
  })
}

export {
  useNotificationCount,
  useAllNotifications
}