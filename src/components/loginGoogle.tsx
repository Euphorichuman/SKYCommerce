import React from "react";
import { useGoogleAuth } from "../providers/authentication";
import { useApi } from "../providers/API";
import { useUsersLogin } from "../hooks/userLogin";
import "./styles/loginGoogle.scss";

export function LoginGoogle() {
  const { signIn }: any = useGoogleAuth();
  const { setTokenId }: any = useApi();
  const { signInUser } = useUsersLogin();

  const handleSignIn = async () => {
    const { tokenId } = await signIn();
    setTokenId(tokenId);
    signInUser(tokenId);
  };

  return (
    <button
      onClick={handleSignIn}
      className="btn btn-primary btn-custom-xs btn-custom-lg rounded-pill d-flex justify-content-evenly"
    >
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        }
        alt="Google logo"
      />
      <span className="">Iniciar sesión con Google</span>
    </button>
  );
}
