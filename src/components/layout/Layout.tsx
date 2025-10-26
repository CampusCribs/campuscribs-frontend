import { Outlet } from "react-router";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AuthContextProvider from "../auth/AuthContextProvider";

const Layout = () => {
  return (
    <AuthContextProvider>
      <div className="w-full flex justify-center">
        <div
          className="flex flex-col
        min-h-screen w-full max-w-[600px] shadow-xl"
        >
          <div className="sticky top-0 z-50 bg-white">
            <Header />
          </div>
          <div className="grow">
            <Outlet />
          </div>

          <div className="sticky left-0 bottom-0 w-10 z-50">
            <Footer />
          </div>
        </div>
      </div>
    </AuthContextProvider>
  );
};

export default Layout;
