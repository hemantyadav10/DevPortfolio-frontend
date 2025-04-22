import apiClient from "../apiClient"

const getUnreadNotificationCount = async () => {
  const { data } = await apiClient.get('notifications/count');
  return data.data;
}

const getNotifications = async (params) => {
  const { data } = await apiClient.get('/notifications', { params });
  return data.data;
}

const deleteReadNotifications = async () => {
  const { data } = await apiClient.delete("/notifications/read");
  return data.data;
};

const deleteAllNotifications = async () => {
  const { data } = await apiClient.delete("/notifications");
  return data.data;
};

const markAllAsRead = async () => {
  const { data } = await apiClient.patch('/notifications');
  return data.data;
}

const markAsRead = async (id) => {
  const { data } = await apiClient.patch(`notifications/${id}`);
  return data.data;
}

export {
  getUnreadNotificationCount,
  getNotifications,
  deleteReadNotifications,
  deleteAllNotifications,
  markAllAsRead,
  markAsRead
}