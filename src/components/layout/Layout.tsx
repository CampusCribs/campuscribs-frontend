import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const profiledata = {
    userName: "johnnyrrockets",
  };
  return (
    <div className="w-full flex justify-center">
      <div
        className="flex flex-col
        min-h-screen w-full max-w-[600px] shadow-xl"
      >
        <div className="sticky top-0 z-50 bg-white">
          <Header {...profiledata} />
        </div>
        <div className="grow">
          <Outlet />
        </div>

        <div className="sticky left-0 bottom-0 w-10">
          <Footer userName={profiledata.userName} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
