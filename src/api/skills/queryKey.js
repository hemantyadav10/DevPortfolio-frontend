export const skillQueryKeys = {
  all: ['skills'],
  byUserAndCategory: (userId) => ['skills', 'byUserAndCategory', userId],
  paginatedByUser: ({ userId, limit, currentUser }) => [...skillQueryKeys.all, 'paginated', userId, limit, currentUser],
  paginatedByUserBase: (userId) => ['skills', 'paginated', userId],
};