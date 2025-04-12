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

const login = async ({ identifier, password }) => {
  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isEmail = emailPattern.test(identifier);

  const payload = isEmail
    ? { email: identifier, password }
    : { username: identifier, password };

  const { data } = await apiClient.post(`${BASE_URL}/login`, payload);

  return data?.data;
};

const registerUser = async (formData) => {
  const { data } = await apiClient.post(`${BASE_URL}/register`, formData);
  return data?.data;
};

const logout = async () => {
  const { data } = await apiClient.post(`${BASE_URL}/logout`)
  return data?.data;
}

const getCurrentUser = async () => {
  const { data } = await apiClient.get(`${BASE_URL}/current-user`);
  return data?.data;
}

const updateProfile = async (data) => {
  const res = apiClient.patch('/users/update-profile', data);
  return res.data?.data;
}

export {
  fetchAllDevelopers,
  getDeveloperProfile,
  login,
  logout,
  getCurrentUser,
  registerUser,
  updateProfile
}