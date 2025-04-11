import { useMutation } from "@tanstack/react-query";
import { login, logout, registerUser } from "./api";

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
  return useMutation({
    mutationFn: logout,
  })
}

export {
  useLogin,
  useLogout,
  useRegisterUser
}