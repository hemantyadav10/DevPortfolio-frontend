import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleEndorsement } from "./api";
import { endorsementQueryKeys } from "./queryKey";
import { statsKeys } from "../stats/queryKeys";
import { skillQueryKeys } from "../skills/queryKey";

export const useToggleEndorsement = ({ skillId, limit, userId, isEndorsedByMe, currentUser, skillLimit }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: toggleEndorsement,
    onSuccess: (data) => {
      const { _id, name, username, profilePictureUrl } = currentUser;

      queryClient.setQueryData(skillQueryKeys.paginatedByUser({ userId, limit: skillLimit, currentUser: _id }), (oldData) => {

        if (!oldData) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            docs: page.docs.map((skill) => {
              if (skill._id !== skillId) return skill;

              const currentEndorsements = skill.totalEndorsements || 0;
              const newEndorsements = isEndorsedByMe
                ? currentEndorsements - 1
                : currentEndorsements + 1;

              return {
                ...skill,
                isEndorsedByMe: !skill.isEndorsedByMe,
                totalEndorsements: newEndorsements,
                verified: newEndorsements >= 3
              };
            }),
          })),
        };
      }
      );

      queryClient.setQueryData(endorsementQueryKeys.bySkill({ skillId, limit }), oldData => {

        if (!oldData) return;

        const updatedPages = oldData.pages.map((page, index) => {
          if (isEndorsedByMe) {
            return {
              ...page,
              docs: page.docs.filter(
                (doc) => doc.endorsedBy._id !== _id
              ),
              totalDocs: page.totalDocs - 1

            };
          } else {
            const newEndorsement = {
              _id: data?._id,
              createdAt: data?.createdAt,
              endorsedBy: {
                _id,
                name,
                username,
                profilePictureUrl,
              },
            };

            if (index === 0) {
              return {
                ...page,
                docs: [newEndorsement, ...page.docs],
                totalDocs: page.totalDocs + 1
              };
            } else {
              return page;
            }
          }
        });

        return {
          ...oldData,
          pages: updatedPages,
        };

      })

      queryClient.invalidateQueries({ queryKey: endorsementQueryKeys.bySkill({ skillId, limit }) });
      queryClient.invalidateQueries({ queryKey: statsKeys.all });
      queryClient.invalidateQueries({ queryKey: skillQueryKeys.byUserAndCategory(userId) });
    }
  });
};