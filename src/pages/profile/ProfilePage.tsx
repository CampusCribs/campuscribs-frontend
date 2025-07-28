import { Button } from "@/components/ui/button";
import {
  GetUsersProfile200,
  useGetPublicProfileByUsername,
  useGetUsersMe,
  useGetUsersProfile,
} from "@/gen";
import useAuthenticatedClientConfig from "@/hooks/use-authenticated-client-config";
import {
  buildDraftImageURL,
  buildImageURL,
  buildThumbnailURL,
} from "@/lib/image-resolver";
import { ArrowRight, CirclePlus, CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router";
import { GetPublicProfileByUsername200 } from "@/gen";
import { i } from "motion/react-client";
const ProfilePage = () => {
  const navigate = useNavigate();

  const config = useAuthenticatedClientConfig();

  const { data, isLoading, isError, error } = useGetUsersMe({ ...config });

  const {
    data: profile,
    error: profile_error,
    isLoading: profile_isLoading,
  } = useGetPublicProfileByUsername(data?.data.username || "");

  const { data: profile_draft, isLoading: profile_draftLoading } =
    useGetUsersProfile({ ...config });

  const Thumbnail = buildThumbnailURL(
    data?.data.id || "",
    data?.data.thumbnailMediaId || ""
  );
  const profileData = profile?.data || profile_draft?.data;
  console.log("profileData", profileData);
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
              src={Thumbnail}
              alt="Profile"
              className="object-cover w-full h-full "
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
        {profileData?.postProfile && <Post profile={profileData} />}
        {!profileData?.postProfile?.title && (
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

const Post = ({ profile }: { profile?: GetUsersProfile200 }) => {
  const navigate = useNavigate();
  const imageUrl = profile?.postProfile?.post
    ? buildImageURL(
        profile.userProfile?.id || "",
        profile?.postProfile?.postId || "",
        profile?.postProfile?.mediaId || ""
      )
    : buildDraftImageURL(
        profile?.userProfile?.id || "",
        profile?.postProfile?.postId || "",
        profile?.postProfile?.mediaId || ""
      );

  return (
    <div className=" mx-5 mb-10 rounded-xl ">
      <div className="relative h-[500px] rounded-xl overflow-hidden bg-neutral-800">
        {/* Placeholder image for the post */}
        <img
          src={imageUrl}
          alt="post"
          className=" w-full h-full object-contain"
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className=" gap-y-2 flex justify-between border">
        <div className=" px-8 gap-y-2 my-3 flex flex-col  ">
          <div>{profile && profile.postProfile?.description}</div>
          <div>roomates: {profile && profile.postProfile?.roommates}</div>
          <div>price: {profile && profile.postProfile?.price}</div>
          <div className=" flex flex-row justify-between ">
            <div className="flex text-wrap w-2/3">
              description: {profile && profile.postProfile?.description}
            </div>
          </div>
        </div>
        <div
          className="flex border w-1/6 bg-black justify-center items-center cursor-pointer"
          onClick={() => navigate(`/cribs/${profile?.postProfile?.postId}`)}
        >
          <ArrowRight color="white" size={40} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
