import { Button } from "@/components/ui/button";
import {
  GetUsersProfile200,
  useDeletePosts,
  useGetUsersMe,
  useGetUsersProfile,
} from "@/gen";
import useAuthenticatedClientConfig from "@/hooks/use-authenticated-client-config";
import {
  buildDraftImageURL,
  buildImageURL,
  buildThumbnailURL,
} from "@/lib/image-resolver";
import { ArrowRight, CirclePlus, CircleUserRound, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { LoadingProfilePage } from "./loading/LoadingComponents";
import Error from "../error/Error";

const ProfilePage = () => {
  const navigate = useNavigate();

  const config = useAuthenticatedClientConfig();

  const { data, isLoading, isError, error } = useGetUsersMe({ ...config });

  const {
    data: profile_draft,
    isLoading: profile_draftLoading,
    isError: profile_draftError,
  } = useGetUsersProfile({ ...config });

  const Thumbnail = buildThumbnailURL(
    data?.data.id || "",
    data?.data.thumbnailMediaId || ""
  );

  if (isLoading || profile_draftLoading) {
    return <LoadingProfilePage />;
  }
  if (isError) {
    return <Error />;
  }
  return (
    <div className="flex flex-col w-full">
      {data && (
        <>
          <div className="flex p-3 w-full">
            <div className="flex rounded-full w-24 h-24 overflow-hidden">
              {data && !data.data.thumbnailMediaId && (
                <div className="flex justify-center items-center w-full">
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
              <div className="px-5 font-light text-md">
                @{data?.data.username}
              </div>
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
            <div className="p-5">
              {data?.data.bio ??
                "Please enter a bio to finish setting up your profile!"}
            </div>
            <div className="px-5 pb-5">
              <div>Email: {data?.data.email ?? "N/A"}</div>
              <div>
                Phone: {data?.data.phone ?? "please set your phone number"}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="w-full">
        {profile_draft?.data?.postProfile && (
          <Post
            profile={profile_draft.data}
            isPost={profile_draft.data.postProfile.post}
          />
        )}
        {!profile_draft?.data?.postProfile?.title && (
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

const Post = ({
  profile,
  isPost,
}: {
  profile?: GetUsersProfile200;
  isPost: boolean;
}) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);
  const config = useAuthenticatedClientConfig();
  const { mutateAsync: deletePost } = useDeletePosts({
    ...config,
  });
  console.log(isPost, "isPost");
  const imageUrl = isPost
    ? buildImageURL(
        profile?.userProfile?.id || "",
        profile?.postProfile?.postId || "",
        profile?.postProfile?.mediaId || ""
      )
    : buildDraftImageURL(
        profile?.userProfile?.id || "",
        profile?.postProfile?.postId || "",
        profile?.postProfile?.mediaId || ""
      );

  const handleConfirmDelete = async () => {
    try {
      await deletePost().then(() => {
        setIsDeleting(false);
        alert("Post deleted successfully");
        window.location.reload();
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      setIsDeleting(false);
      alert("Failed to delete post");
    }
  };
  return (
    <div className=" mx-5 mb-10 rounded-xl border-1 border-black ">
      <div className="relative h-[500px] rounded-xl overflow-hidden bg-neutral-800">
        <img
          src={imageUrl}
          alt="post"
          className=" w-full h-full object-contain"
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        {isPost && (
          <div
            className="absolute top-0 right-0 p-4 text-white"
            onClick={() => setIsDeleting(true)}
          >
            <X size={50} />
          </div>
        )}
      </div>
      {!isPost && (
        <div className="flex justify-end p-3">
          <div>Please wait for post to be verified </div>
          <Button className="cursor-pointer" onClick={() => navigate("post")}>
            Edit Post
          </Button>
        </div>
      )}
      {isDeleting && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-50 flex items-center justify-center" />
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center space-y-4">
              <h2 className="text-lg font-semibold">Delete Post</h2>
              <p>Are you sure you want to delete this post?</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setIsDeleting(false)} // cancel
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete} // your delete logic
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {isPost && (
        <div className=" gap-y-2 flex justify-between ">
          <div className=" px-8 gap-y-2 my-3 flex flex-col w-3/4 ">
            <div className="line-clamp-2">
              title: {profile && profile.postProfile?.title}
            </div>
            <div>roomates: {profile && profile.postProfile?.roommates}</div>
            <div>price: {profile && profile.postProfile?.price}</div>
            <div className=" flex flex-row justify-between ">
              <div className="line-clamp-2">
                description: {profile && profile.postProfile?.description}
              </div>
            </div>
          </div>
          <div
            className="flex w-1/6 bg-black justify-center items-center cursor-pointer"
            onClick={() => {
              if (isPost) {
                navigate(`/cribs/${profile?.postProfile?.postId}`);
              }
            }}
          >
            <ArrowRight color="white" size={40} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
