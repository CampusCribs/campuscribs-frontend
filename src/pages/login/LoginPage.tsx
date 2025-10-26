import useLogin from "@/hooks/use-login";
import { useEffect } from "react";

const LoginPage = () => {
  const { login } = useLogin();
  useEffect(() => {
    login();
  }, []);
  return (
    <div
      className="w-full h-full
    flex flex-col justify-center gap-4
    px-16"
    ></div>
  );
};

export default LoginPage;
