import { useGetPublicProfileByUsername } from "@/gen";
import { buildImageURL, buildThumbnailURL } from "@/lib/image-resolver";
import { ArrowLeftIcon, ArrowRight, CircleUserRound } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { LoadingProfilePage } from "../loading/LoadingComponents";
import Error from "@/pages/error/Error";

const ProfileUsernamePage = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const {
    data: profile,
    error: profile_error,
    isLoading: profile_isLoading,
  } = useGetPublicProfileByUsername(username || "");

  const thumbnailUrl =
    profile?.data.userProfile?.thumbnailMediaId != null
      ? buildThumbnailURL(
          profile?.data?.userProfile?.id || "",
          profile?.data?.userProfile?.thumbnailMediaId || ""
        )
      : null;

  const postThumbnailUrl = buildImageURL(
    profile?.data?.userProfile?.id || "",
    profile?.data?.postProfile?.postId || "",
    profile?.data?.postProfile?.mediaId || ""
  );
  function formatPhoneNumber(phoneNumber: string | undefined): string {
    if (!phoneNumber) return "";

    // strip all non-digits
    const cleaned = phoneNumber.replace(/\D/g, "");

    // handle 10-digit US numbers
    if (cleaned.length === 10) {
      const area = cleaned.slice(0, 3);
      const middle = cleaned.slice(3, 6);
      const last = cleaned.slice(6);
      return `(${area}) ${middle}-${last}`;
    }

    // handle 11-digit with leading "1"
    if (cleaned.length === 11 && cleaned.startsWith("1")) {
      const area = cleaned.slice(1, 4);
      const middle = cleaned.slice(4, 7);
      const last = cleaned.slice(7);
      return `+1 (${area}) ${middle}-${last}`;
    }

    // fallback: just return original string
    return phoneNumber;
  }
  console.log(profile);
  if (profile_isLoading) {
    return <LoadingProfilePage />;
  }
  if (profile_error) {
    return <Error />;
  }
  return (
    <div className="flex flex-col w-full">
      <div className="px-3 pt-3">
        <div onClick={() => window.history.back()}>
          <ArrowLeftIcon size={40} />
        </div>
      </div>
      <div className="flex p-3 w-full">
        <div className="flex rounded-full w-24 h-24 overflow-hidden">
          {profile && !profile.data.userProfile?.thumbnailMediaId && (
            <div className="flex justify-center items-center w-full">
              <CircleUserRound size={80} />
            </div>
          )}
          {profile && profile.data.userProfile?.thumbnailMediaId && (
            <img
              src={thumbnailUrl || ""}
              alt="Profile"
              className="object-cover w-full h-full "
            />
          )}
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
          <div className="text-wrap flex text-sm w-full mt-1 px-4">
            {profile?.data?.userProfile?.institutionName && (
              <div className="text-sm font-medium">
                {profile.data.userProfile.institutionName}
              </div>
            )}
          </div>
        </div>
      </div>
      {profile && (
        <>
          <div>
            <div className="px-5 pb-5 text-wrap wrap-break-word">
              {profile && profile.data.userProfile?.bio}
            </div>
            <div className="px-5 pb-5 underline">
              <div>
                <a
                  href={`mailto:${profile && profile.data.userProfile?.email}`}
                >
                  {profile && profile.data.userProfile?.email}
                </a>
              </div>
              <div>
                <a href={`tel:${profile && profile.data.userProfile?.phone}`}>
                  {profile &&
                    formatPhoneNumber(profile.data.userProfile?.phone)}
                </a>
              </div>
            </div>
          </div>
          <div className=" mx-5 mb-10 rounded-xl border">
            <div className="relative h-[500px] rounded-xl overflow-hidden bg-neutral-800">
              {/* Placeholder image for the post */}
              <img
                src={postThumbnailUrl}
                alt="post"
                className=" w-full h-full object-contain"
              />
              <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
            </div>
            <div className=" gap-y-2 flex justify-between ">
              <div className=" px-8 gap-y-2 my-3 flex flex-col  w-3/4">
                <div className="line-clamp-2">
                  title: {profile && profile.data.postProfile?.title}
                </div>
                <div>
                  roomates: {profile && profile.data.postProfile?.roommates}
                </div>
                <div>price: {profile && profile.data.postProfile?.price}</div>
                <div className=" flex flex-row justify-between ">
                  <div className="line-clamp-2 ">
                    description:{" "}
                    {profile && profile.data.postProfile?.description}
                  </div>
                </div>
              </div>
              <div
                className="flex w-1/6 bg-black justify-center items-center cursor-pointer"
                onClick={() =>
                  navigate(`/cribs/${profile.data.postProfile?.postId}`)
                }
              >
                <ArrowRight color="white" size={40} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileUsernamePage;
