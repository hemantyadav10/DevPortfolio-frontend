// src/context/authController.js
let authSetters = {
  setUser: () => {},
  setIsAuthenticated: () => {}
};

export const setAuthSetters = (setUserFn, setIsAuthFn) => {
  authSetters.setUser = setUserFn;
  authSetters.setIsAuthenticated = setIsAuthFn;
};

export const getAuthSetters = () => authSetters;
