export const notificationKeys = {
  all: ['notifications'],
  list: (params) => ['notifications', 'list', params],
  unreadCount: () => [...notificationKeys.all, 'unreadCount'],
};