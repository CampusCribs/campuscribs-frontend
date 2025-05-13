import React from "react";

const ProfilePage = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex p-3 w-full">
        <div className="flex rounded-full w-24 h-24 overflow-hidden">
          <img
            src={`${import.meta.env.VITE_MINIO_ENDPOINT}/GrayBrickHouse-social-share.jpg`}
            alt="Profile"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col w-3/4">
          <div className="text-lg font-medium px-4">firstname lastname</div>
          <div className="px-5 font-light text-md">@username</div>
          <div className="text-wrap flex text-sm w-full  px-5">
            <button className="mt-2 cursor-pointer w-full border p-2 bg-neutral-700 text-white shadow-lg rounded-xl">
              edit profile
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="p-5">
          Hi my name is so and so and I am looking for a roomate this year I am
          a biological sciences major and I want to find someone who is also in
          the same major. I am looking for someone who is clean and respectful
          and who is willing to share a room with me. I am also looking for
          someone who is willing to go out and have fun on the weekends. I am a
          very social person and I love to meet new people. I am also very
          active and I love to go to the gym. If you are interested in being my
          roomate please let me know.
        </div>
      </div>

      <div className=" mx-5 mb-10 rounded-xl border">
        <div className="relative h-[500px] rounded-xl overflow-hidden bg-neutral-800">
          <img
            src={`${import.meta.env.VITE_MINIO_ENDPOINT}/GrayBrickHouse-social-share.jpg`}
            alt="post"
            className=" w-full h-full object-contain"
          />
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
        </div>
        <div className="py-2 px-8 gap-y-2 flex flex-col">
          <div>In need of 2 roomates!</div>
          <div>roomates: 2</div>
          <div>price: 500</div>
          <div className=" flex flex-row justify-between ">
            <div className="flex text-wrap w-2/3">
              description: hello I want to to do this and that and that and this
              and...
            </div>
            <div>
              <button className="text-blue-600 underline cursor-pointer">
                View Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
