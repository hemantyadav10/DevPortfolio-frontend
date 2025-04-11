import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useGetCurrentUser } from "../api/developers/queries";
import { useLogin, useLogout, useRegisterUser } from "../api/developers/mutations";

const AuthContext = createContext({
  user: null,
  setUser: () => { },
  handleLogin: async () => { },
  handleRegister: async () => { },
  handleLogout: async () => { },
  isAuthenticated: false,
  setIsAuthenticated: () => { },
  isLoading: false,
  logoutLoading: false,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('dev-user')) || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  const { data: currentUser, isLoading: isLoadingUser } = useGetCurrentUser(user?._id);

  const { mutateAsync: login, isPending: isLoggingIn } = useLogin();
  const { mutateAsync: register, isPending: isRegistering } = useRegisterUser();
  const { mutateAsync: logout, isPending: isLoggingOut } = useLogout();

  useEffect(() => {
    if (currentUser?.user) {
      setUser(currentUser.user);
      setIsAuthenticated(true);
      localStorage.setItem('dev-user', JSON.stringify(currentUser.user));
    }
  }, [currentUser]);

  const handleLogin = async ({ identifier, password }) => {
    try {
      const res = await login({ identifier, password });
      const { user, accessToken } = res;

      setUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('token', accessToken);
      localStorage.setItem('dev-user', JSON.stringify(user));
    } catch (error) {
      console.error("Login error:", error);
      throw error
    }
  }

  const handleRegister = async (formData) => {
    try {
      await register(formData);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  const handleLogout = async () => {
    try {
      await logout();

      setIsAuthenticated(false);
      setUser(null);
      // toast('Logged out successfully');

      localStorage.removeItem('token');
      localStorage.removeItem('dev-user');
    } catch (error) {
      console.error('Logout Error:', error)
      toast.error('Logout unsuccessful. Please try again.')
    }
  }

  const value = useMemo(() => ({
    user: currentUser?.user || user,
    setUser,
    handleLogin,
    handleRegister,
    handleLogout,
    isAuthenticated,
    setIsAuthenticated,
    isLoading: isLoadingUser || isLoggingIn || isLoggingOut || isRegistering,
    logoutLoading: isLoggingOut,
  }), [currentUser, user, isAuthenticated, isLoadingUser, isLoggingIn, isLoggingOut, isRegistering]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;