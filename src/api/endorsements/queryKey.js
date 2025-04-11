export const endorsementQueryKeys = {
  all: ['endorsements'],
  bySkill: ({ skillId, limit }) => [...endorsementQueryKeys.all, skillId, limit],
};