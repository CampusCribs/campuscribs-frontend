import { useNavigate, useParams } from "react-router";

const ProfileUsernamePage = () => {
  const navigate = useNavigate();
  const { username } = useParams();

  // const { data, error, isLoading } = useGetUser({
  //   username: username || "",
  // });

  const data = {
    data: {
      firstName: "TestFirst",
      lastName: "TestLast",
      username: "testusername",
      email: "testemail",
      phone: "testphone",
      bio: "testbio... hello 1234, helloworld",
      post: {
        roommates: 1,
        price: 1,
        id: 1,
        description: "testdescription",
      },
    },
  };

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
          <div className="text-lg font-medium px-4">
            {data && data.data.firstName + " " + data.data.lastName}
          </div>
          <div className="px-5 font-light text-md">@{data && username}</div>
        </div>
      </div>
      <div>
        <div className="p-5">{data && data.data.bio}</div>
        <div className="px-5 pb-5">
          <div>{data && data.data.email}</div>
          <div>{data && data.data.phone}</div>
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
          <div>{data && data.data.bio}</div>
          <div>roomates: {data && data.data.post?.roommates}</div>
          <div>price: {data && data.data.post?.price}</div>
          <div className=" flex flex-row justify-between ">
            <div className="flex text-wrap w-2/3">
              description: {data && data.data.post?.description}
            </div>
            <div>
              <button
                className="text-blue-600 underline cursor-pointer"
                onClick={() => navigate(`/cribs/${data && data.data.post?.id}`)}
              >
                View Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUsernamePage;
