import useEmblaCarousel from "embla-carousel-react";
import { Badge } from "@/components/ui/badge";

type Props = {
  tags: string[];
  fetched_tags: string[];
  tag_error?: string;
  tag_isLoading?: boolean;
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
        {props.fetched_tags.map((tag) => (
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
