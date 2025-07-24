import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../../config/firebase";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();
// add loading firebase
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setIsLoggedIn(!!currentUser);
      setUser(currentUser);
      setLoading(false);
      console.log("Utilisateur changé:", currentUser)
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, setIsLoggedIn , loading}}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);