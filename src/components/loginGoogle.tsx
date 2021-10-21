import React from "react";
import { useGoogleAuth } from "../providers/authentication";
import { useUsers } from "../hooks/users";
import "./styles/loginGoogle.scss";

export function LoginGoogle() {
  const { signIn }: any = useGoogleAuth();
  const {signInUser} = useUsers();

  const handleSignIn = async () => {
    const { tokenId } = await signIn();
    console.log(tokenId);
    signInUser(tokenId);
    window.sessionStorage.setItem('tokenId', tokenId);
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
