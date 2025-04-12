import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login, logout, registerUser, updateProfile } from "./api";
import { developersKeys } from "./queryKey";

// Hook to handle user login
const useLogin = () => {
  return useMutation({
    mutationFn: login,
  });
};

// Hook to handle user registration
const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

// Hook to handle user logout
const useLogout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
    }
  })
}

const useUpdateProfile = (userId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: developersKeys.profile(userId) })
    }
  })
}

export {
  useLogin,
  useLogout,
  useRegisterUser,
  useUpdateProfile
}