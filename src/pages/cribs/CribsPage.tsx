import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dot, ListFilter, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import TagSelector from "./TagSelector";
import { useInView } from "react-intersection-observer";

import TagCarousel from "./TagCarousel";
import { useNavigate } from "react-router";
import { useGetPublicCuratedInfinite, useGetPublicTags } from "@/gen";

const CribsPage = () => {
  //variables to store the selected tags and the state of the tag selector and find the intersection of the tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openTag, setOpenTag] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ref, inView } = useInView();

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
          <div className="grid grid-cols-2 gap-1 w-full p-2">
            {curated_isLoading && <p>loading...</p>}
            {curated_error?.response?.status !== 404 && curated_error && (
              <p>error occured</p>
            )}
            {curated_error?.response?.status === 404 && (
              <p>No residences found</p>
            )}
            {curated &&
              curated.pages.map((item) =>
                item.data.content?.map((residence) => (
                  <ResidenceCard
                    key={residence.id}
                    thumbnail={""}
                    id={residence.id || ""}
                    price={residence.price || 0}
                    location="CUF"
                  />
                ))
              )}
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
  thumbnail = "https://picsum.photos/200/300?random=";
  return (
    <Card
      className="rounded-none shadow-none m-0 w-full border-none cursor-pointer p-1"
      onClick={() => navigate(`/cribs/${id}`)}
      key={id}
    >
      <CardContent className="p-0 m-0 w-full border-none ">
        <img src={thumbnail} alt="Residence" className="object-cover" />
      </CardContent>
      <CardFooter className="p-0 m-0 w-full px-4 py-2">
        <div className="flex justify-between  w-full ">
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
      </CardFooter>
    </Card>
  );
};

export default CribsPage;
