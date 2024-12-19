import { At } from "@atcute/client/lexicons";
import { finalizeAuthorization, getSession, OAuthUserAgent } from "@atcute/oauth-browser-client";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  agent?: OAuthUserAgent;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  logOut: async () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [agent, setAgent] = useState<OAuthUserAgent | undefined>(undefined);

  useEffect(() => {
    const init = async () => {
      const params = new URLSearchParams(location.hash.slice(1));

      if (params.has("state") && (params.has("code") || params.has("error"))) {
        history.replaceState(null, "", location.pathname + location.search);

        const session = await finalizeAuthorization(params);
        const did = session.info.sub;

        localStorage.setItem("lastSignedIn", did);
        return session;
      } else {
        const lastSignedIn = localStorage.getItem("lastSignedIn");

        if (lastSignedIn) {
          try {
            return await getSession(lastSignedIn as At.DID);
          } catch (err) {
            localStorage.removeItem("lastSignedIn");
            throw err;
          }
        }
      }
    };

    init()
      .then(session => {
        if (session) {
          setAgent(new OAuthUserAgent(session));
          setIsLoggedIn(true);
        }

        setIsReady(true)
      })
      .catch(() => {});
  }, []);

  if (!isReady) return null;

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      agent,
      logOut: async () => {
        setIsLoggedIn(false);
        await agent?.signOut();
      },
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
