import apiClient from "../apiClient"

const getUserSkillsByCategory = async ({ userId }) => {
  const { data } = await apiClient.get(`/skills/${userId}`);
  return data?.data;
}

const getAllUserSkills = async ({ userId, page = 1, limit = 10 }) => {
  const { data } = await apiClient.get(`/skills/user/${userId}`, {
    params: { page, limit },
  });
  return data?.data;
};

export {
  getUserSkillsByCategory,
  getAllUserSkills
}