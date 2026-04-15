import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ load user từ localStorage
  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    try {
      setUser(JSON.parse(storedUser));
    } catch (error) {
      console.error("JSON parse lỗi:", error);
      localStorage.removeItem("user");
      setUser(null);
    }
  }
}, []);

  // ✅ login lưu USER (không phải token)
  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token"); // nếu sau này dùng
  setUser(null);
};

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth phải dùng trong AuthProvider");
  }

  return context;
};