import React from "react";
import { useGoogleLogin } from "react-use-googlelogin";

const GoogleAuthContext: any = React.createContext(""); // Not necessary, but recommended.

interface IGoogleAuthProviderProps {
  children: React.ReactNode;
}

export const GoogleAuthProvider = ({ children }: IGoogleAuthProviderProps): JSX.Element => {
  const googleAuth = useGoogleLogin({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID!, // ClientID from Google.
  });

  return (
    <GoogleAuthContext.Provider value={googleAuth}>
      {children}
    </GoogleAuthContext.Provider>
  );
};

export const useGoogleAuth = () => React.useContext(GoogleAuthContext);
