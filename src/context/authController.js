let authSetters = {
  setUser: () => {},
  setIsAuthenticated: () => {}, 
  setShowSessionExpiredModal: () => {}
};

export const setAuthSetters = (setUserFn, setIsAuthFn, setShowModalFn) => {
  authSetters.setUser = setUserFn;
  authSetters.setIsAuthenticated = setIsAuthFn;
  authSetters.setShowSessionExpiredModal = setShowModalFn;
};


export const getAuthSetters = () => authSetters;
