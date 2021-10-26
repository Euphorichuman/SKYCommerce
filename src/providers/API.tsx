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

  interface IServiceCallProps {
    endpoint: string;
    method: string;
    tokenId?: string;
    request?: any;
  }

  const serviceCall = async (props: IServiceCallProps) => {
    const { endpoint, method, tokenId, request } = props;
    const url = `${process.env.REACT_APP_API_URL}${endpoint}`;
    const response = await fetch(url, {
      method,
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
        Authorization: tokenId!,
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

  const GETCall = (url: string) => {
    return serviceCall({ endpoint: url, method: "GET", tokenId });
  };

  const POSTCall = (url: string, request: any) => {
    return serviceCall({ endpoint: url, method: "POST", request });
  };

  const DELETECall = (url: string) => {
    return serviceCall({ endpoint: url, method: "DELETE", tokenId });
  };

  const PUTCall = (url: string, request: any) => {
    return serviceCall({ endpoint: url, method: "PUT", tokenId, request });
  };

  const value = {
    serviceCall,
    setTokenId,
    GETCall,
    POSTCall,
    DELETECall,
    PUTCall,
    tokenId,
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const useApi = () => React.useContext(ApiContext);
