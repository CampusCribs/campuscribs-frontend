// import { useSearch } from "@/gen";
import { Send } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router";

type Props = {
  open: boolean;
  close: () => void;
};

const HeaderSearch = (props: Props) => {
  const [query, setQuery] = useState<string>("");
  // const { mutate, error, isError, isPending, data } = useSearch();

  // const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
  //   setQuery(e.target.value);

  //   mutate({ data: { query: e.target.value } });
  // };

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
              // onChange={(e) => handleSearch(e)}
              value={query}
              placeholder="Search for anything"
              className="border rounded-lg p-3  bg-white text-black my-3 w-full shadow-sm"
            />
          </div>
          <div className=" flex pr-4 items-center justify-center">
            <Send size={32} className="cursor-pointer" />
          </div>
        </div>
        {/* <div>
          {isPending && <p>loading...</p>}
          {isError && <p>error: {error.message}</p>}
          {(data?.data?.users?.length || 0) > 0 && (
            <div>
              <div className="px-3 font-light">Users</div>
              {data?.data?.users?.map((user) => (
                <SearchResult
                  key={user.id}
                  id={user.id || ""}
                  text={user.username || ""}
                  thumbnail={user.thumbnail || ""}
                  close={props.close}
                />
              ))}
            </div>
          )} */}

          {/* {(data?.data.posts?.length || 0) > 0 && (
            <div>
              {" "}
              <div className="px-3 font-light">Cribs</div>
              {data?.data?.posts?.map((post) => (
                <SearchResult
                  key={post.id}
                  id={post.id || ""}
                  thumbnail={post.thumbnail || ""}
                  close={props.close}
                  text={post.title || ""}
                />
              ))}
            </div>
          )}
        </div> */}
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

const SearchResult = (props: {
  id: string;
  text: string;
  thumbnail: string;
  close: () => void;
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-row p-3 px-5 m-1  rounded-xl border cursor-pointer "
      onClick={() => {
        props.close();
        navigate(`/profile/${props.id}`);
      }}
    >
      <div className="flex items-center justify-center ">
        <img
          src={
            import.meta.env.VITE_MINIO_ENDPOINT +
            "/GrayBrickHouse-social-share.jpg"
          }
          alt="user"
          className="rounded-full w-10 h-10 mr-3 shadow-lg"
        />
      </div>
      <div className=" flex items-center text-lg">@{props.text}</div>
    </div>
  );
};
export default HeaderSearch;
