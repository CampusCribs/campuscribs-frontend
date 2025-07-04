import { useGetPublicProfileByUsername } from "@/gen";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const ProfileUsernamePage = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const {
    data: profile,
    error: profile_error,
    isLoading: profile_isLoading,
  } = useGetPublicProfileByUsername(username || "");

  return (
    <div className="flex flex-col w-full">
      <div className="px-3 pt-3">
        <div onClick={() => window.history.back()}>
          <ArrowLeftIcon size={40} />
        </div>
      </div>
      <div className="flex p-3 w-full">
        <div className="flex rounded-full w-24 h-24 overflow-hidden">
          <img
            src={"https://picsum.photos/id/103/600/600"}
            alt="Profile"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-3/4">
          <div className="text-lg font-medium px-4">
            {profile &&
              profile.data.userProfile?.firstName +
                " " +
                profile.data.userProfile?.lastName}
          </div>
          <div className="px-5 font-light text-md">
            {profile && "@" + username}
          </div>
        </div>
      </div>
      {profile_isLoading && (
        <div className="flex items-center justify-center w-full">
          <span>Loading...</span>
        </div>
      )}
      {profile_error && (
        <div className="flex items-center justify-center w-full">
          <span>Error loading profile</span>
        </div>
      )}
      {profile && (
        <>
          <div>
            <div className="p-5">
              {profile && profile.data.userProfile?.bio}
            </div>
            <div className="px-5 pb-5">
              <div>{profile && profile.data.userProfile?.email}</div>
              <div>{profile && profile.data.userProfile?.phone}</div>
            </div>
          </div>
          <div className=" mx-5 mb-10 rounded-xl border">
            <div className="relative h-[500px] rounded-xl overflow-hidden bg-neutral-800">
              {/* Placeholder image for the post */}
              <img
                src={"https://picsum.photos/id/103/600/600"}
                alt="post"
                className=" w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className="py-2 px-8 gap-y-2 flex flex-col">
              <div>{profile && profile.data.postProfile?.description}</div>
              <div>
                roomates: {profile && profile.data.postProfile?.roommates}
              </div>
              <div>price: {profile && profile.data.postProfile?.price}</div>
              <div className=" flex flex-row justify-between ">
                <div className="flex text-wrap w-2/3">
                  description:{" "}
                  {profile && profile.data.postProfile?.description}
                </div>
                <div>
                  <button
                    className="text-blue-600 underline cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/cribs/${profile && profile.data.postProfile?.postId}`
                      )
                    }
                  >
                    View Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileUsernamePage;
