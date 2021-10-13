import React from "react";
import { useGoogleLogin } from "react-google-login";
import './styles/loginGoogle.scss';

const loginId =
  "287909153704-iae15oh5o2bn539gbqboeoj573e1tjsf.apps.googleusercontent.com";

export function LoginGoogle() {
  const onSuccess = (response: any) => {
    console.log("Login Success: User:", response.profileObj.name);
  };

  const onFailure = (response: any) => {
    console.log("Login failed", response);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId: loginId,
    isSignedIn: true,
    accessType: "offline",
  });
  return (
    <button
      onClick={signIn}
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
