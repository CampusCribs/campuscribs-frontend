import { Button } from "@/components/ui/button";
import { useGetUsersMe, User } from "@/gen";
import useAuthenticatedClientConfig from "@/hooks/use-authenticated-client-config";
import useEasyAuth from "@/hooks/use-easy-auth";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const { user } = useEasyAuth();

  const config = useAuthenticatedClientConfig();
  const { data, isLoading, isError, error } = useGetUsersMe({ ...config });

  return (
    <div className="flex flex-col w-full">
      <div className="flex p-3 w-full">
        <div className="flex rounded-full w-24 h-24 overflow-hidden">
          <img
            src={resolveProfileImageUrl(
              data?.data,
              user?.profile.given_name,
              user?.profile.family_name
            )}
            alt="Profile"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-3/4">
          <div className="text-lg font-medium px-4">
            {user?.profile.given_name} {user?.profile.family_name}
          </div>
          <div className="px-5 font-light text-md">@{data?.data.username}</div>
          <div className="text-wrap flex text-sm w-full  px-5">
            <button className="mt-2 cursor-pointer w-full border p-2 bg-neutral-700 text-white shadow-lg rounded-xl">
              edit profile
            </button>
          </div>
        </div>
      </div>
      <div>
        {isError && <div>{error?.message}</div>}
        {isLoading && <div>Loading...</div>}
        <div className="p-5">{data?.data.bio ?? "No bio."}</div>
        <div className="px-5 pb-5">
          <div>Email: {data?.data.email ?? "N/A"}</div>
          <div>Phone: {data?.data.phone ?? "N/A"}</div>
        </div>
      </div>
      {/* <div>
        <div className="p-5">{data && data.data.bio}</div>
        <div className="px-5 pb-5">
          <div>{data && data.data.email}</div>
          <div>{data && data.data.phone}</div>
        </div>
      </div> */}
      <div className="w-full">
        <div className="w-full  h-full flex justify-center items-center mt-10">
          <Button onClick={() => navigate("post")} className="cursor-pointer">
            <CirclePlus /> Create a new post!
          </Button>
        </div>
      </div>
    </div>
  );
};

const resolveProfileImageUrl = (
  user?: User,
  firstName?: string,
  lastName?: string
) => {
  if (!user || !user.thumbnailMediaId)
    return `https://ui-avatars.com/api/?name=${firstName}+${lastName}`;

  // TODO: implement
  return user.thumbnailMediaId;
};

export default ProfilePage;
