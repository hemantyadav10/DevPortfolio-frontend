export const developersKeys = {
  all: ['developers'],
  list: (filters) => [...developersKeys.all, { ...filters }],
  profile: (userId) => [...developersKeys.all, 'profile', userId],
  featured: () => [...developersKeys.all, 'featured'],
}