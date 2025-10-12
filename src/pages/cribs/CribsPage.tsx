import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  CircleX,
  Dot,
  ListFilter,
  MapPin,
  SearchX,
  ShieldCheck,
  ShieldOff,
} from "lucide-react";
import { useEffect, useState } from "react";
import TagSelector from "./TagSelector";
import { useInView } from "react-intersection-observer";
import TagCarousel from "./TagCarousel";
import { useNavigate } from "react-router";
import { useGetPublicCuratedInfinite, useGetPublicTags } from "@/gen";
import { buildImageURL } from "@/lib/image-resolver";

import Lottie from "lottie-react";
import house from "@/components/ui/houseanimation.json"; // IMPORTANT: import, don't pass a string path

const CribsPage = () => {
  //variables to store the selected tags and the state of the tag selector and find the intersection of the tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openTag, setOpenTag] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref, inView } = useInView();
  const [openWelcome, setOpenWelcome] = useState<boolean>(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem("firstVisit");
    setOpenWelcome(firstVisit === null);
  }, []);

  const {
    data: curated,
    error: curated_error,
    isLoading: curated_isLoading,
  } = useGetPublicCuratedInfinite({
    page: 0,
    size: 10,
    sort: ["createdAt,desc"],
    tag: selectedTags,
  });

  const {
    data: tags,
    error: tags_error,
    isLoading: tags_isLoading,
  } = useGetPublicTags({});

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };
  console.log(curated);
  useEffect(() => {
    if (inView) {
      // call the generated function
    }
  }, [inView]);
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col w-full  ">
        <div className="flex flex-row justify-between gap-2 w-full p-2 h-12 overflow-hidden items-center">
          <TagCarousel
            tags={selectedTags}
            setTags={(tag) => handleTagClick(tag)}
            fetched_tags={tags?.data || []}
            tag_error={tags_error}
            tag_isLoading={tags_isLoading}
          />

          <div
            className="flex flex-row rounded-full bg-white shadow-md p-2 gap-2 items-center justify-center border-neutral-200 border"
            onClick={() => setOpenTag(!openTag)}
          >
            <ListFilter />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between gap-2 w-full p-2 h-12">
            <div className="text-xl font-black">Today's Picks</div>
            <div className="flex flex-row gap-2 items-center text-blue-400">
              <div>
                <MapPin width={16} height={16} />
              </div>
              <div className="text-lg font-bold">Cincinnati</div>
            </div>
          </div>
          <div className="w-full ">
            {curated_isLoading && (
              <div className="flex w-full h-[400px] justify-center items-center ">
                <div className="flex flex-col items-center justify-center">
                  <Lottie
                    animationData={house}
                    loop
                    autoplay
                    style={{ width: 200, height: 200 }}
                  />
                  <div>loading...</div>
                </div>
              </div>
            )}
            {curated_error?.response?.status !== 404 && curated_error && (
              <div className="flex w-full h-[400px] justify-center items-center ">
                <div className="flex flex-col">
                  <div className="flex justify-center mb-4">
                    <CircleX size={82} />
                  </div>
                  <div>An Error Occured</div>
                </div>
              </div>
            )}
            {curated_error?.response?.status === 404 && (
              <div className="flex w-full h-[400px] justify-center items-center ">
                <div className="flex flex-col">
                  <div className="flex justify-center mb-4">
                    <SearchX size={82} />
                  </div>
                  <div>No residences found</div>
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-1 w-full p-2">
              {curated &&
                curated.pages.map((item) =>
                  item.data.content?.map((residence) => (
                    <ResidenceCard
                      key={residence.id}
                      userId={residence.userId || ""}
                      thumbnail={residence.mediaId || ""}
                      id={residence.id || ""}
                      price={residence.price || 0}
                      location="CUF"
                      name={residence.name || ""}
                      iconKey={residence.iconKey || ""}
                      ableToUse={residence.ableToUse || false}
                    />
                  ))
                )}
            </div>
          </div>
          <div />
          <div ref={ref} />
        </div>
        <TagSelector
          fetched_tags={tags?.data || []}
          tag_error={tags_error}
          tag_isLoading={tags_isLoading}
          tags={selectedTags}
          open={openTag}
          closeTag={() => setOpenTag(!openTag)}
          clearTags={() => setSelectedTags([])}
          setTags={(tag: string) => {
            handleTagClick(tag);
          }}
        />
      </div>
      {openWelcome && <Welcome setOpenWelcome={setOpenWelcome} />}
    </div>
  );
};

const ResidenceCard = ({
  userId,
  thumbnail,
  id,
  price,
  location,
  name,
  iconKey,
  ableToUse,
}: {
  userId: string;
  thumbnail: string;
  id: string;
  price: number;
  location: string;
  name: string;
  iconKey: string;
  ableToUse: boolean;
}) => {
  const navigate = useNavigate();
  thumbnail = buildImageURL(userId, id, thumbnail);

  return (
    <Card
      className="rounded-none  shadow-none m-0 w-full border-none cursor-pointer p-1"
      onClick={() => navigate(`/cribs/${id}`)}
      key={id}
    >
      <CardContent className="p-0 m-0 w-full border-none aspect-[4/3] ">
        <img
          src={thumbnail}
          alt="Residence"
          className="object-cover aspect-[4/3] w-full h-full"
        />
      </CardContent>
      <CardFooter className="p-0 m-0 w-full px-4 py-2">
        <div className="flex justify-between  w-full ">
          <div className="flex items-center">
            <div className="flex ">
              <div className="text-md font-bold">${price}</div>
            </div>
            <div className="flex justify-center  items-center">
              <Dot width={24} height={24} />
            </div>
            <div className="flex w-full ">
              <div className="text-md font-bold">{location}</div>
            </div>
          </div>
          <div className="flex  items-center justify-center mr-5 w-full">
            {ableToUse && iconKey != "" ? (
              <div className="relative group">
                <div className="absolute left-1/2 bottom-full translate-x-[-50%] mb-2 flex-col items-center group-hover:flex hidden ">
                  <div className=" z-20 p-2 bg-white text-center rounded shadow text-sm">
                    Student at the {name}
                  </div>
                </div>

                <img
                  title="UC Logo"
                  className="w-10"
                  src={import.meta.env.VITE_SCHOOL_LOGO + iconKey}
                />
              </div>
            ) : !ableToUse && iconKey != "" ? (
              <div className="relative group">
                <div className="absolute left-1/2 bottom-full translate-x-[-50%] mb-2 flex-col items-center group-hover:flex hidden ">
                  <div className=" z-20 p-2 bg-white text-center rounded shadow text-sm">
                    Student at the {name}
                  </div>
                </div>
                <div className="flex justify-center items-center w-full">
                  <p className=" font-semibold text-lg italic ">UC</p>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute left-1/2 bottom-full translate-x-[-50%] mb-2 flex-col items-center group-hover:flex hidden ">
                  <div className=" z-20 p-2 bg-white text-center rounded shadow text-sm">
                    Not verified
                  </div>
                </div>
                <ShieldOff />
              </div>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

const Welcome = ({
  setOpenWelcome,
}: {
  setOpenWelcome: (open: boolean) => void;
}) => {
  return (
    <>
      <div className="fixed inset-0 opacity-50 bg-black flex items-center justify-center z-50" />
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className=" bg-white z-50 rounded-2xl py-10 p-6  shadow-lg text-center mx-10">
          <h2 className="text-2xl font-bold mb-4">Welcome to Campus Cribs!</h2>
          <p className="mb-4">Find subleases from fellow students</p>
          <p className="mb-6">
            {" "}
            Discover affordable subleases from fellow students, post your own
            listing, and connect with a trusted community right here at UC.
            CampusCribs makes it simple, secure, and student-friendly to find
            your next home near campus.
          </p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors"
            onClick={() => {
              localStorage.setItem("firstVisit", "false");
              setOpenWelcome(false);
            }}
          >
            Start Exploring
          </button>
        </div>
      </div>
    </>
  );
};
export default CribsPage;
