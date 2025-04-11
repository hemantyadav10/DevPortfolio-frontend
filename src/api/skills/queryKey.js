export const skillQueryKeys = {
  all: ['skills'],
  byUserAndCategory: (userId) => ['skills', 'byUserAndCategory', userId],
  paginatedByUser: ({ userId, limit }) => [...skillQueryKeys.all, 'paginated', userId, limit],
};