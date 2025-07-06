import { Button } from "@/components/ui/button";
import { useGetUsersMe } from "@/gen";
import useAuthenticatedClientConfig from "@/hooks/use-authenticated-client-config";
import { CirclePlus, CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const navigate = useNavigate();

  const config = useAuthenticatedClientConfig();

  const { data, isLoading, isError, error } = useGetUsersMe({ ...config });

  const postDoesntExist = true;

  return (
    <div className="flex flex-col w-full">
      <div className="flex p-3 w-full">
        <div className="flex rounded-full w-24 h-24 overflow-hidden">
          {isLoading && <div>Loading...</div>}
          {data && !data.data.thumbnailMediaId && (
            <div className="flex justify-center items-center w-full">
              {" "}
              <CircleUserRound size={80} />
            </div>
          )}
          {data && data.data.thumbnailMediaId && (
            <img
              src={
                import.meta.env.VITE_MINIO_ENDPOINT +
                "/users/" +
                data.data.id +
                "/thumbnails/" +
                data.data.thumbnailMediaId
              }
              alt="Profile"
              className="object-cover"
            />
          )}
        </div>
        <div className="flex flex-col w-3/4">
          <div className="text-lg font-medium px-4">
            {data?.data.firstName} {data?.data.lastName}
          </div>
          <div className="px-5 font-light text-md">@{data?.data.username}</div>
          <div className="text-wrap flex text-sm w-full  px-5">
            <button
              className="mt-2 cursor-pointer w-full border p-2 bg-neutral-700 text-white shadow-lg rounded-xl"
              onClick={() => navigate("edit")}
            >
              edit profile
            </button>
          </div>
        </div>
      </div>
      <div>
        {isError && <div>{error?.message}</div>}
        {isLoading && <div>Loading...</div>}
        <div className="p-5">
          {data?.data.bio ??
            "Please enter a bio to finish setting up your profile!"}
        </div>
        <div className="px-5 pb-5">
          <div>Email: {data?.data.email ?? "N/A"}</div>
          <div>Phone: {data?.data.phone ?? "please set your phone number"}</div>
        </div>
      </div>
      <div className="w-full">
        {/* TODO: render post button if post doesnt already exist */}
        {postDoesntExist && (
          <div className="w-full  h-full flex justify-center items-center mt-10">
            <Button onClick={() => navigate("post")} className="cursor-pointer">
              <CirclePlus /> Create a new post!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
