import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    return token
      ? { token, role: localStorage.getItem('role'), name: localStorage.getItem('name') }
      : null;
  });

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    localStorage.setItem('name', data.name);
    setUser({ token: data.token, role: data.role, name: data.name });
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}