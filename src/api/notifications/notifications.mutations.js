import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAllNotifications, deleteReadNotifications, markAllAsRead, markAsRead } from "./notifications.api";
import { notificationKeys } from "./notifications.keys";
import { toast } from "sonner";

const useDeleteReadNotifications = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteReadNotifications,
    onSuccess: (data) => {
      toast.success(`Deleted ${data.deletedCount} read notification(s)`);
      queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    onError: () => {
      toast.error('Failed to delete read notifications');
    }
  });
};

const useDeleteAllNotifications = (filters) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAllNotifications,
    onSuccess: (data) => {
      queryClient.setQueryData(notificationKeys.unreadCount(), { count: 0 });

      queryClient.setQueryData(notificationKeys.list(filters), prev => {
        if (!prev) return;
        return {
          ...prev,
          pages: [{
            ...prev.pages[0],
            docs: [],
            totalDocs: 0,
            hasNextPage: false,
            nextPage: null
          }]
        }
      });

      toast.success(`Deleted ${data.deletedCount} notification(s)`);
      // queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    onError: () => {
      toast.error('Failed to delete notifications');
    }
  });
};

const useMarkAllAsRead = (filters) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAllAsRead,
    onSuccess: () => {
      queryClient.setQueryData(notificationKeys.unreadCount(), { count: 0 });
      queryClient.setQueryData(notificationKeys.list(filters), (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            docs: page.docs.map((n) => ({ ...n, isRead: true }))
          }))
        };
      });
      // queryClient.invalidateQueries({ queryKey: notificationKeys.all });
    },
    onError: () => {
      toast.error("Failed to mark all notifications as read")
    }
  })
}

const useMarkAsRead = ({ id, filters }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: markAsRead,
    onSuccess: () => {
      queryClient.setQueryData(notificationKeys.unreadCount(), (oldData) => {
        if (oldData && oldData.count > 0) {
          return { count: oldData.count - 1 };
        }
        return { count: 0 };
      });

      queryClient.setQueryData(notificationKeys.list(filters), (oldData) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            docs: page.docs.map((n) =>
              n._id === id ? { ...n, isRead: true } : n
            ),
          })),
        };
      });
    },
    onError: () => {
      toast.error("Failed to mark notification as read");
    },
  });
};


export {
  useDeleteReadNotifications,
  useDeleteAllNotifications,
  useMarkAllAsRead,
  useMarkAsRead
}