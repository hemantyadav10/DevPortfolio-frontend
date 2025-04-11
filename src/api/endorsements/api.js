import apiClient from "../apiClient";

const getSkillEndorsements = async ({ skillId, page = 1, limit = 5 }) => {
  const { data } = await apiClient.get(`/endorsements/${skillId}`, {
    params: { page, limit },
  });
  return data?.data;
};

export {
  getSkillEndorsements
}
