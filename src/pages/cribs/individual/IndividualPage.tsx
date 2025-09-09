import { ArrowLeftIcon, CircleUserRound } from "lucide-react";
import IndividualSlider from "./IndividualSlider";
import { useNavigate } from "react-router";
import { useGetPublicCribPostid } from "@/gen";
import { buildThumbnailURL } from "@/lib/image-resolver";
const IndividualPage = () => {
  const navigate = useNavigate();
  //fetch images from server and pass them to the slider prop
  const id = window.location.pathname.split("/").pop() || "";
  const {
    data: post,
    error: post_error,
    isLoading: post_isLoading,
  } = useGetPublicCribPostid(id);

  const thumbnailUrl = buildThumbnailURL(
    post?.data?.userId || "",
    post?.data?.userThumbnailId || ""
  );
  return (
    <div className="mb-6">
      <div
        className="flex justify-start pl-4 pb-3"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon size={40} />
      </div>
      <div>
        <IndividualSlider
          images={post?.data?.mediaIds || []}
          userId={post?.data?.userId || ""}
          postId={post?.data?.id || ""}
        />
      </div>
      {post_isLoading && (
        <div className="flex items-center justify-center w-full">
          <span>Loading...</span>
        </div>
      )}
      {post_error && (
        <div className="flex items-center justify-center w-full ">
          <span>Error loading post</span>
        </div>
      )}
      {post && (
        <>
          <div className="flex ">
            {post && !post.data.userThumbnailId && (
              <div className="flex justify-center items-center ml-5">
                <CircleUserRound size={70} />
              </div>
            )}
            {post && post.data.userThumbnailId && (
              <div>
                <img
                  alt="profile"
                  src={thumbnailUrl}
                  className="rounded-full h-24 m-5 w-24 object-cover shadow-2xl border"
                />
              </div>
            )}

            <div className="flex flex-col justify-center w-full mx-7">
              <div className="font-semibold text-xl">
                {post.data.firstName + " " + post.data.lastName}{" "}
              </div>
              <div className="border-b pb-2 w-full">@{post.data.username}</div>
            </div>
          </div>
          <div>
            <div className="text-3xl font-semibold p-4">{post.data.title}</div>
            <div className="text-lg px-6 text-wrap wrap-break-word">
              {post.data.description}
            </div>
            <div className="text-lg px-8 py-3 flex">
              <div className="font-semibold flex mr-1">Price: </div>{" "}
              {post.data.price}
            </div>
            <div className="text-lg pb-3 px-8 flex">
              <div className="font-semibold mr-1">Roommates:</div>
              {post.data.roommates}
            </div>
            <div className="text-lg px-8 flex mb-3">
              <div className="mr-1 font-semibold">Lease from:</div>{" "}
              {post.data.termStartDate &&
                new Date(post.data.termStartDate).toLocaleDateString()}{" "}
              to{" "}
              {post.data.termEndDate &&
                new Date(post.data.termEndDate).toLocaleDateString()}
            </div>
            <div className="text-lg px-8 flex">
              <div className="mr-1 font-semibold">Tags:</div>
            </div>
            <div className="flex justify-center border rounded-xl mx-8 my-2 py-2">
              <div className="flex max-w-[400px] flex-wrap p-4 justify-center">
                {post.data.tags?.map((item, index) => (
                  <div
                    key={index}
                    className="flex p-2 bg-black text-white m-1 rounded-full shadow-xl"
                  >
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-row-reverse px-8 py-2">
            <button
              className="bg-blue-500 rounded-full p-3 px-4 shadow-xl text-white underline cursor-pointer "
              onClick={() => navigate(`/profile/${post.data.username}`)}
            >
              Contact
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualPage;
