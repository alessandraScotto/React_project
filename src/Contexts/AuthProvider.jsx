import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../Supabase/Client";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email, password) =>
    supabase.auth.signInWithPassword({ email, password });

  const signOut = () => supabase.auth.signOut();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        const { user } = session;
        // console.log(user);
        setUser(() => user);
      }
    };

    getUser();

    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        // boh, ci sarà una certa logica
      } else if (event === "USER_UPDATED") {
        console.log("UPDATE USER ==> ", user);
        setUser(() => session.user);
      } else if (event === "SIGNED_IN") {
        console.log("SIGN IN USER ==> ", user);
        setUser(() => session.user);
      } else if (event === "SIGNED_OUT") {
        console.log("BYE");
        setUser(() => null);
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
