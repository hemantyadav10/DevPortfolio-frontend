import apiClient from "../apiClient";

const BASE_URL = '/users';

const fetchAllDevelopers = async ({
  page = 1,
  limit = 3,
  query = '',
  category = ''
}) => {
  const { data } = await apiClient.get(BASE_URL, {
    params: { page, limit, query, category }
  });
  return data?.data;
}

const getDeveloperProfile = async (userId) => {
  const { data } = await apiClient.get(`${BASE_URL}/profile/${userId}`);
  return data?.data;
};

export {
  fetchAllDevelopers,
  getDeveloperProfile,
}