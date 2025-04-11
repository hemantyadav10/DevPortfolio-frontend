import apiClient from "../apiClient";

const getPlatformStats = async () => {
  const { data } = await apiClient.get('/stats');
  return data.data;
}

export {
  getPlatformStats
}