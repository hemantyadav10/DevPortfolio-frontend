export const endorsementQueryKeys = {
  all: ['endorsements'],
  bySkill: ({ skillId, limit }) => [...endorsementQueryKeys.all, skillId, limit],
  bySkillId: (skillId) => [...endorsementQueryKeys.all, skillId],
  recent: ({ userId, limit = 3 }) => [...endorsementQueryKeys.all, 'recent', userId, limit],
};