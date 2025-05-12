import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dot, ListFilter, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import TagSelector from "./TagSelector";
import { useInView } from "react-intersection-observer";

import TagCarousel from "./TagCarousel";
import { useNavigate } from "react-router";
import { useGetPostsInfinite } from "@/gen";

const CribsPage = () => {
  //variables to store the selected tags and the state of the tag selector and find the intersection of the tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openTag, setOpenTag] = useState(false);
  const { ref, inView } = useInView();

  const { data, error, isLoading } = useGetPostsInfinite({
    page: 0,
    limit: 5,
    tags: selectedTags,
  });
  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

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
          <div className="grid grid-cols-2 gap-1 w-full p-2">
            {isLoading && <p>loading...</p>}
            {error && <p>error occured</p>}
            {data &&
              data.pages.map((item) =>
                item.data.map((residence) => (
                  <ResidenceCard
                    key={residence.id}
                    thumbnail={`${import.meta.env.VITE_MINIO_ENDPOINT}/GrayBrickHouse-social-share.jpg`}
                    id={residence.id}
                    price={residence.price}
                    location="CUF"
                  />
                ))
              )}
          </div>
          <div />
          {/*ref={ref}*/}
        </div>
        <TagSelector
          tags={selectedTags}
          open={openTag}
          closeTag={() => setOpenTag(!openTag)}
          clearTags={() => setSelectedTags([])}
          setTags={(tag: string) => {
            handleTagClick(tag);
          }}
        />
      </div>
    </div>
  );
};

const ResidenceCard = ({
  thumbnail,
  id,
  price,
  location,
}: {
  thumbnail: string;
  id: string;
  price: number;
  location: string;
}) => {
  const navigate = useNavigate();
  return (
    <Card
      className="rounded-none shadow-none m-0 w-full border-none cursor-pointer p-1"
      onClick={() => navigate(`/posts/${id}`)}
      key={id}
    >
      <CardContent className="p-0 m-0 w-full border-none ">
        <img src={thumbnail} alt="Residence" className="object-cover" />
      </CardContent>
      <CardFooter className="p-0 m-0 w-full px-4 py-2">
        <div className="flex flex-row justify-between">
          <div className="flex gap-0">
            <div className="flex gap-1">
              <div className="text-md font-bold">$1,100</div>
              <div className="text-md font-bold text-gray-500 line-through">
                ${price}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <Dot width={24} height={24} />
            </div>
            <div className="flex gap-2 w-full">
              <div className="text-md font-bold">{location}</div>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CribsPage;
