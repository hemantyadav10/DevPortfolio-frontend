import apiClient from "../apiClient"

export const getDashboardStats = async () => {
  const { data } = await apiClient.get('/dashboard/');
  return data?.data;
}