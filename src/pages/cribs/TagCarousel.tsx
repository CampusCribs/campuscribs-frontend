import useEmblaCarousel from "embla-carousel-react";
import { Badge } from "@/components/ui/badge";

const _tag = {
  // TODO implement dynamic fetching of categories and tags from the backend
  tags: [],
};
type Props = {
  tags: string[];
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
        {_tag.tags.map((tag) => (
          <Badge
            key={tag}
            onClick={() => props.setTags(tag)}
            className="cursor-pointer text-nowrap rounded-full px-4 overflow-hidden"
            variant={props.tags.includes(tag) ? "default" : "outline"}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
