import { Badge } from "@/components/ui/badge";
import {
  amenitiesTags,
  leaseTags,
  preferenceTags,
  propertyTags,
  roomTags,
} from "@/constants/constants";

type Props = {
  tags: string[];
  open: boolean;
  closeTag: () => void;
  clearTags: () => void;
  setTags: (tags: string) => void;
};

const TagSelector = (props: Props) => {
  return (
    <>
      <div
        className={`${
          props.open
            ? "max-w-[600px] absolute top-16 left-1/2 transform -translate-x-1/2 w-full flex justify-center z-10"
            : "hidden"
        }`}
      >
        <div className=" w-[95%] rounded-xl shadow-2xl bg-white ">
          <div className="flex justify-between p-4">
            <div className="text-2xl font-semibold">Select tags</div>
            <div className="flex">
              <div
                className="bg-neutral-200 font-light rounded-xl py-1 px-2 cursor-pointer mx-5"
                onClick={props.closeTag}
              >
                Close
              </div>
              <div
                className="text-lg font-light cursor-pointer"
                onClick={props.clearTags}
              >
                Clear
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-wrap p-4">
              <div className="w-1/2 my-2">
                <div className="text-lg font-semibold">Lease Types</div>
                {leaseTags.map((tag) => (
                  <Badge
                    className={`cursor-pointer rounded-full `}
                    variant={props.tags.includes(tag) ? "default" : "outline"}
                    key={tag}
                    onClick={() => props.setTags(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="w-1/2 my-2">
                <div className="text-lg font-semibold">Property Types</div>
                {propertyTags.map((tag) => (
                  <Badge
                    className={`cursor-pointer rounded-full`}
                    variant={props.tags.includes(tag) ? "default" : "outline"}
                    key={tag}
                    onClick={() => props.setTags(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="w-1/2 my-2">
                <div className="text-lg font-semibold">Room Types</div>
                {roomTags.map((tag) => (
                  <Badge
                    className={`cursor-pointer rounded-full`}
                    variant={props.tags.includes(tag) ? "default" : "outline"}
                    key={tag}
                    onClick={() => props.setTags(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="w-1/2 my-2">
                <div className="text-lg font-semibold">Preferences</div>
                {preferenceTags.map((tag) => (
                  <Badge
                    className={`cursor-pointer rounded-full`}
                    variant={props.tags.includes(tag) ? "default" : "outline"}
                    key={tag}
                    onClick={() => props.setTags(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="w-1/2 my-2">
                <div className="text-lg font-semibold">Amenities</div>
                {amenitiesTags.map((tag) => (
                  <Badge
                    className={`cursor-pointer rounded-full`}
                    variant={props.tags.includes(tag) ? "default" : "outline"}
                    key={tag}
                    onClick={() => props.setTags(tag)}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {props.open && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={props.closeTag}
        />
      )}
    </>
  );
};

export default TagSelector;
