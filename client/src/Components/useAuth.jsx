import { useState, useEffect } from "react";

const useAuth = () => {
 const [auth, setAuth] = useState(false);

 useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
 }, []);

 const handleLogin = () => {
    localStorage.setItem("token", "dummy-token");
    setAuth(true);
 };

 const handleLogout = () => {
    localStorage.removeItem("token");
    setAuth(false);
 };

 return { auth, handleLogin, handleLogout };
};

export default useAuth;