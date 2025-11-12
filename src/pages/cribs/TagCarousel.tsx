import useEmblaCarousel from "embla-carousel-react";
import { Badge } from "@/components/ui/badge";
import { ResponseErrorConfig } from "@/lib/client";

type fetched_tag_string = {
  id?: string;
  name?: string;
  tagCategoryId?: string;
};
type Props = {
  tags: string[];
  fetched_tags: fetched_tag_string[];
  tag_error: ResponseErrorConfig<Error> | null;
  tag_isLoading: boolean | undefined;
  setTags: (tag: string) => void;
};
const Carousel = (props: Props) => {
  const [emblaRef] = useEmblaCarousel({
    duration: 2000, // Duration of the transition in milliseconds
    loop: false,
    dragFree: true, // Allows smooth movement without snapping
    direction: "ltr", // Change direction based on props
  });

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex gap-2">
        {props.tag_isLoading &&
          Array.from({ length: 10 }).map((_, index) => (
            <Badge
              key={index}
              variant="outline"
              className="cursor-pointer rounded-full px-10 py-2 animate-pulse bg-neutral-500"
              style={{ animationDelay: `${index * 0.2}s` }}
            ></Badge>
          ))}
        {props.tag_error ? (
          <div className="flex items-center justify-center w-full ">
            <span>Error loading tags</span>
          </div>
        ) : null}
        {(props.fetched_tags ?? [])
          .filter((tag): tag is { name: string } => !!tag.name)
          .map((tag) => (
            <Badge
              key={tag.name}
              onClick={() => props.setTags(tag.name)}
              className="cursor-pointer text-nowrap rounded-full px-4 overflow-hidden"
              variant={props.tags.includes(tag.name) ? "default" : "outline"}
            >
              {tag.name}
            </Badge>
          ))}
      </div>
    </div>
  );
};

export default Carousel;
