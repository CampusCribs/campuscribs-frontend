import { Button } from "@/components/ui/button";
import useLogin from "@/hooks/use-login";

const LoginPage = () => {
  const { login } = useLogin();
  return (
    <div className="flex flex-col w-full">
      <Button onClick={login} variant={"default"}>
        Login
      </Button>
    </div>
  );
};

export default LoginPage;
