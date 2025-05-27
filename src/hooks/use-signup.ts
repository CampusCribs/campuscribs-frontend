import useEasyAuth from "./use-easy-auth";

type UseSignup = {
  signup: () => void;
};

const useSignup = (): UseSignup => {
  const { authContext } = useEasyAuth();

  const signup = () => {
    authContext.signinRedirect({
      scope: "untrusted-audience openid email profile",
      extraQueryParams: {
        kc_action: "register",
      },
    });
  };

  return {
    signup,
  };
};

export default useSignup;
