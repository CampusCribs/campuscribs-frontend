import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, AuthProviderProps } from "react-oidc-context";
import { NotifierProvider } from "./components/ui/Notify.tsx";

const queryClient = new QueryClient();

const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_AUTHORITY,
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: `${window.location.origin}${window.location.pathname}`,
  post_logout_redirect_uri: window.location.origin,
  automaticSilentRenew: true,
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider {...oidcConfig}>
      <NotifierProvider>
        <App />
      </NotifierProvider>
    </AuthProvider>
  </QueryClientProvider>
);
