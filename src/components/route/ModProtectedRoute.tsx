



import useEasyAuth from "@/hooks/use-easy-auth";
import LoadingPage from "@/pages/loading/LoadingPage";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, authContext } = useEasyAuth();
    authContext.
  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;



const RequireMod: FC<{ children: ReactNode }> = ({ children }) => {



  const { hasRole } = useAuth(); // Keycloak hook
  return hasRole("moderator") ? <>{children}</> : <Navigate to="/" replace />;
};
