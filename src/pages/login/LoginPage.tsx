import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/use-login";

const LoginPage = () => {
  const { login } = useLogin();
  return (
    <div
      className="w-full h-full
    flex flex-col justify-center gap-4
    px-16">
      <Button size={"lg"} onClick={login} variant={"default"}>
        Login
      </Button>
      <Button size={"lg"} onClick={login} variant={"secondary"}>
        Create Account
      </Button>
    </div>
  );
};

export default LoginPage;
