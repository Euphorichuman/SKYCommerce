import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useGoogleAuth } from "./authentication";
const ApiContext = React.createContext({}); // context

interface IAPIProviderProps {
  children: React.ReactNode;
}

export const APIProvider = ({ children }: IAPIProviderProps) => {
  const [tokenId, setTokenId] = useState();
  const { signOut }: any = useGoogleAuth();
  const history = useHistory();

  const serviceCall = async ( endpoint: string, method: string, tokenId: string, request?: any) => {

    const url = `${process.env.REACT_APP_API_URL}${endpoint}`;
    
    const response = await fetch(url, {
      method,
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenId,
      },
    });

    if (response.ok) {
      return response.json();
    } else {
      const status = response.status;
      switch (status) {
        case 401:
          signOut();
          history.push("/login");
          break;
        case 403:
          history.push("/no-access");
          break;
        default:
          throw new Error();
      }
    }
  };

  /*const GETCall = (url: any) => {
    const
    return serviceCall(url , "GET", tokenId);
  };*/

  /*
  const POSTCall = ({ url, request }: any) => {
    return serviceCall(url, "POST", tokenId, request);
  };

  const DELETECall = ({ url }: any) => {
    return serviceCall(url, "DELETE", tokenId);
  };

  const PUTCall = ({ url, request }: any) => {
    return serviceCall(url, "PUT", tokenId, request);
  };*/

  const value = {
    serviceCall,
    setTokenId,
    tokenId,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => React.useContext(ApiContext);
