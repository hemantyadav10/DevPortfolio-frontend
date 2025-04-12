import apiClient from "../apiClient";

const getSkillEndorsements = async ({ skillId, page = 1, limit = 5 }) => {
  const { data } = await apiClient.get(`/endorsements/${skillId}`, {
    params: { page, limit },
  });
  return data?.data;
};

const toggleEndorsement = async ({ skillId, endorsedTo }) => {
  const { data } = await apiClient.post("/endorsements", { skillId, endorsedTo });
  return data?.data;
};

const fetchRecentEndorsements = async ({ userId, limit = 3 }) => {
  const { data } = await apiClient.get(`/endorsements/recent/${userId}`, {
    params: { limit },
  });
  return data?.data;
};

export {
  getSkillEndorsements,
  toggleEndorsement, 
  fetchRecentEndorsements
}
