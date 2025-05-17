import { ArrowLeftIcon } from "lucide-react";
import IndividualSlider from "./IndividualSlider";
import { useNavigate } from "react-router";

const IndividualCrib = () => {
  const navigate = useNavigate();
  //fetch images from server and pass them to the slider prop
  //   const id = useParams();
  // const { data, error, isLoading } = useGetCrib({
  //   cribId: id,
  //  });
  const images = [
    `http://localhost:9000/campuscribs/cribs/GrayBrickHouse-social-share.jpg`,
    `http://localhost:9000/campuscribs/cribs/GrayBrickHouse-social-share.jpg`,
    `http://localhost:9000/campuscribs/cribs/GrayBrickHouse-social-share.jpg`,
    `http://localhost:9000/campuscribs/cribs/GrayBrickHouse-social-share.jpg`,
    `http://localhost:9000/campuscribs/cribs/GrayBrickHouse-social-share.jpg`,
  ];
  return (
    <div className="mb-6">
      <div
        className="flex justify-start pl-4 pb-3"
        onClick={() => navigate(-1)}
      >
        <ArrowLeftIcon size={40} />
      </div>
      <div>
        <IndividualSlider images={images} />
      </div>
      <div className="flex ">
        <div>
          <img
            alt="profile"
            src="https://picsum.photos/id/103/600/600"
            className="rounded-full h-20 m-5 shadow-2xl border"
          />
        </div>
        <div className="flex flex-col justify-center border-b">
          <div className="font-semibold text-xl">Johnny Smith </div>
          <div>@JohnnySmith1432</div>
        </div>
      </div>
      <div>
        <div className="text-3xl font-semibold p-4">
          {/* {data && data.data.title} */}
        </div>
        {/* <div className="text-lg px-6">{data && data.data.description}</div> */}
        <div className="text-lg px-8 py-3 flex">
          <div className="font-semibold flex mr-1">Price: </div>{" "}
          {/* {data && data.data.price} */}
        </div>
        <div className="text-lg pb-3 px-8 flex">
          <div className="font-semibold mr-1">Roommates:</div>
          {/* {data && data.data.roommates} */}
        </div>
        <div className="text-lg px-8 flex mb-3">
          <div className="mr-1 font-semibold">Lease from:</div>{" "}
          {/* {new Date(data && data.data.BeginDate).toLocaleDateString()} to{" "} */}
          {/* {new Date(data && data.data.EndDate).toLocaleDateString()} */}
        </div>
        <div className="text-lg px-8 flex">
          <div className="mr-1 font-semibold">Tags:</div>
        </div>
        <div className="flex justify-center border rounded-xl mx-8 my-2 py-2">
          <div className="flex max-w-[400px] flex-wrap p-4 justify-center">
            {/* {data &&
              data.data.tags.map((item, index) => (
                <div
                  key={index}
                  className="flex p-2 bg-black text-white m-1 rounded-full shadow-xl"
                >
                  {item}
                </div>
              ))} */}
          </div>
        </div>
      </div>
      <div className="flex flex-row-reverse px-8 py-2">
        <button
          className="bg-blue-500 rounded-full p-3 px-4 shadow-xl text-white underline cursor-pointer "
          onClick={() => navigate(`/profile/${"1"}`)}
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default IndividualCrib;
