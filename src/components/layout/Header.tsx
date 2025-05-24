import { CircleUserRound, Search } from "lucide-react";
import { useNavigate } from "react-router";
import HeaderSearch from "./HeaderSearch";
import { useState } from "react";
import HatHouse from "../ui/HouseHat";

const Header = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex items-center gap-2">
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          <HatHouse /> Campus Cribs
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="cursor-pointer" onClick={() => navigate("/profile")}>
          <CircleUserRound />
        </div>
        <div className="cursor-pointer" onClick={() => setOpen(!open)}>
          <Search />
        </div>
      </div>
      <HeaderSearch open={open} close={() => setOpen(!open)} />
    </div>
  );
};

export default Header;
