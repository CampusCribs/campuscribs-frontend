import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dot, ListFilter, MapPin } from "lucide-react";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import TagSelector from "./TagSelector";
import { useInView } from "react-intersection-observer";

import {
  preferenceTags,
  leaseTags,
  amenitiesTags,
  roomTags,
  propertyTags,
} from "../../lib/constants";

const _tag = {
  tags: [
    ...preferenceTags,
    ...leaseTags,
    ...amenitiesTags,
    ...roomTags,
    ...propertyTags,
  ],
};
const CribsPage = () => {
  //variables to store the selected tags and the state of the tag selector and find the intersection of the tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openTag, setOpenTag] = useState(false);
  const { ref, inView } = useInView();

  //useInfiniteQuery to fetch the data from the server
  const { status, data, error, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ["searchtags", { selectedTags }],

      queryFn: ({ pageParam }) =>
        fetchFilterdPosts({ pageParam, selectedTags }),
      staleTime: 4000,
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });
  //Handle Tag click event to set the tags in the array
  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };
  //democode url my-json-server.typicode.com/farahcaa/MockData/posts
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  useEffect(() => {
    console.log("status: ", status);
  }, [status]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between gap-2 w-full  items-center  ">
        <div
          className="flex flex-row justify-start gap-2 
      py-2 px-4 h-12 overflow-x-scroll scrollbar-hide  "
        >
          {_tag.tags.map((tag) => (
            <Badge
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="cursor-pointer text-nowrap"
              variant={selectedTags.includes(tag) ? "default" : "outline"}
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Badge
          key={1}
          onClick={() => setOpenTag(!openTag)}
          className="cursor-pointer text-nowrap px-4m-2"
          variant="outline"
        >
          <ListFilter />
        </Badge>
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
        <div className="">
          {status === "pending" && <div>Loading...</div>}
          {status === "error" && <div>Error: {error.message}</div>}
          {status === "success" &&
            data.pages.map((page, id) => (
              <div key={id} className="grid grid-cols-2 gap-2">
                {page.data.map((residence) => (
                  <ResidenceCard
                    imageUrl={residence.imageUrl}
                    id={residence.id}
                    price={residence.price}
                    location={residence.location}
                  />
                ))}
              </div>
            ))}
        </div>
        <div ref={ref} />
        {isFetchingNextPage ? "render a loading spinner" : null}
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
  );
};

const ResidenceCard = ({
  imageUrl,
  id,
  price,
  location,
}: {
  imageUrl: string;
  id: number;
  price: number;
  location: string;
}) => {
  const navigate = useNavigate();
  id = 1234;
  return (
    <Card
      className="rounded-none shadow-none m-0 w-full border-none cursor-pointer p-1"
      onClick={() => navigate(`/posts/${id}`)}
      key={id}
    >
      <CardContent className="p-0 m-0 w-full border-none ">
        <img src={imageUrl} alt="Residence" className="object-cover" />
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
