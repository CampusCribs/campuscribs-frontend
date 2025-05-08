import { Send } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  open: boolean;
  close: () => void;
};
const HeaderSearch = (props: Props) => {
  //need to go throw and fix this
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    //fetch data with generated function
  };
  return (
    <>
      <div
        className={
          props.open
            ? "absolute w-full left-0  top-15 bg-white rounded-2xl shadow-2xl z-10"
            : "hidden"
        }
      >
        <div className="flex flex-row">
          <div className="w-full px-3">
            <input
              type="text"
              onChange={handleSearch}
              onFocus={() => setSearchTerm("")}
              value={searchTerm}
              placeholder="Search for posts"
              className="border rounded-lg p-3  bg-white text-black my-3 w-full shadow-sm"
            />
          </div>
          <div className=" flex pr-4 items-center justify-center">
            <Send size={32} className="cursor-pointer" />
          </div>
        </div>
        <div>{/* render in all the status for users */}</div>
        <div className="flex flex-row-reverse p-4">
          <div
            className="bg-neutral-200 font-light rounded-xl py-1 px-2 cursor-pointer"
            onClick={props.close}
          >
            Close
          </div>
        </div>
      </div>
      {props.open && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={props.close}
        />
      )}
    </>
  );
};

const SearchResult = (props: { userName: string; close: () => void }) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row p-3 px-10 m-1  rounded-xl border cursor-pointer "
      onClick={() => {
        props.close();
        navigate(`/profile/${props.userName}`);
      }}
    >
      <div className="">@{props.userName}</div>
    </div>
  );
};
export default HeaderSearch;
