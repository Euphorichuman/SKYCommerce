import { useGoogleAuth } from "../providers/authentication";
import { useApi } from "../providers/API";

export const useUsersLogin = () => {
  const { signOut }: any = useGoogleAuth();
  const { serviceCall, setTokenId }: any = useApi();

  const signInUser = (tokenId: string) => {
    serviceCall({ endpoint: "/users/signin", method: "GET", tokenId: tokenId })
      .then(() => console.log("User signed in"))
      .catch((err: any) => {
        signOut();
        setTokenId();
        console.log(err);
      });
  };
  return {
    signInUser,
  };
};
