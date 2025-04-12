export const endorsementQueryKeys = {
  all: ['endorsements'],
  bySkill: ({ skillId, limit }) => [...endorsementQueryKeys.all, skillId, limit],
  recent: ({ userId, limit = 3 }) => [...endorsementQueryKeys.all, 'recent', userId, limit],
};