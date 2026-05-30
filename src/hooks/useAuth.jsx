import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

const VALID_EMAIL = 'admin@inovtek.com';
const VALID_PASSWORD = 'password123';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('rh_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      const u = { email, name: 'Admin Inovtek' };
      sessionStorage.setItem('rh_user', JSON.stringify(u));
      setUser(u);
      return { ok: true };
    }
    return { ok: false, error: 'Email atau password salah.' };
  };

  const logout = () => {
    sessionStorage.removeItem('rh_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
