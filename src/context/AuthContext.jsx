import { createContext, useContext } from 'react';
import { AUTH_TOKEN_KEY } from '../utils/constants.js';
import { useLocalStorage } from '../hooks/useLocalStorage.js';

const AuthContext = createContext(null);

// Context shares login state without passing props through every component.
export function AuthProvider({ children }) {
  const [token, setToken] = useLocalStorage(AUTH_TOKEN_KEY, null);

  const login = ({ email }) => {
    const fakeJwtToken = `fake-jwt-token-for-${email}`;
    setToken(fakeJwtToken);
  };

  const logout = () => {
    setToken(null);
  };

  const value = {
    token,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
