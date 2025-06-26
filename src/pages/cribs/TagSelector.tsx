import { Badge } from "@/components/ui/badge";
import { ResponseErrorConfig } from "@/lib/client";

type fetched_tag_string = {
  id?: string;
  name?: string;
  tagCategoryId?: string;
};
type Props = {
  tags: string[];
  open: boolean;
  fetched_tags: fetched_tag_string[];
  tag_error: ResponseErrorConfig<Error> | null;
  tag_isLoading: boolean | undefined;
  closeTag: () => void;
  clearTags: () => void;
  setTags: (tags: string) => void;
};

const TagSelector = (props: Props) => {
  console.log(props.fetched_tags);
  return (
    <>
      <div
        className={`${
          props.open
            ? "max-w-[600px] absolute top-16 left-1/2 transform -translate-x-1/2 w-full flex justify-center z-10"
            : "hidden"
        }`}
      >
        <div className="w-[95%] rounded-xl shadow-2xl bg-white">
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
            {props.tag_isLoading && (
              <div className="flex items-center justify-center w-full">
                <span>Loading...</span>
              </div>
            )}
            {props.tag_error ? (
              <div className="flex items-center justify-center w-full ">
                <span>Error loading tags</span>
              </div>
            ) : null}

            <div className="flex flex-wrap p-4">
              <div className="w-1/2 my-2">
                <div className="text-lg font-semibold">Property Types</div>
                {(props.fetched_tags ?? [])
                  .filter(
                    (tag): tag is { name: string; tagCategoryId: string } =>
                      Boolean(tag?.name && tag.tagCategoryId === "property")
                  )
                  .map((tag) => (
                    <Badge
                      key={tag.name}
                      className="cursor-pointer rounded-full"
                      variant={
                        props.tags.includes(tag.name) ? "default" : "outline"
                      }
                      onClick={() => props.setTags(tag.name)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
              </div>
              <div className="w-1/2 my-2">
                <div className="text-lg font-semibold">Lease Types</div>
                {(props.fetched_tags ?? [])
                  .filter(
                    (tag): tag is { name: string; tagCategoryId: string } =>
                      Boolean(tag?.name && tag.tagCategoryId === "lease")
                  )
                  .map((tag) => (
                    <Badge
                      key={tag.name}
                      className="cursor-pointer rounded-full"
                      variant={
                        props.tags.includes(tag.name) ? "default" : "outline"
                      }
                      onClick={() => props.setTags(tag.name)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
              </div>
              <div className="w-1/2 my-2">
                <div className="text-lg font-semibold">Room Types</div>
                {(props.fetched_tags ?? [])
                  .filter(
                    (tag): tag is { name: string; tagCategoryId: string } =>
                      Boolean(tag?.name && tag.tagCategoryId === "room")
                  )
                  .map((tag) => (
                    <Badge
                      key={tag.name}
                      className="cursor-pointer rounded-full"
                      variant={
                        props.tags.includes(tag.name) ? "default" : "outline"
                      }
                      onClick={() => props.setTags(tag.name)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
              </div>
              <div className="w-1/2 my-2">
                <div className="text-lg font-semibold">Preferences</div>
                {(props.fetched_tags ?? [])
                  .filter(
                    (tag): tag is { name: string; tagCategoryId: string } =>
                      Boolean(tag?.name && tag.tagCategoryId === "preferences")
                  )
                  .map((tag) => (
                    <Badge
                      key={tag.name}
                      className="cursor-pointer rounded-full"
                      variant={
                        props.tags.includes(tag.name) ? "default" : "outline"
                      }
                      onClick={() => props.setTags(tag.name)}
                    >
                      {tag.name}
                    </Badge>
                  ))}
              </div>
              <div className="w-1/2 my-2">
                <div className="text-lg font-semibold">Amenities</div>
                {(props.fetched_tags ?? [])
                  .filter(
                    (tag): tag is { name: string; tagCategoryId: string } =>
                      Boolean(tag?.name && tag.tagCategoryId === "amenities")
                  )
                  .map((tag) => (
                    <Badge
                      key={tag.name}
                      className="cursor-pointer rounded-full"
                      variant={
                        props.tags.includes(tag.name) ? "default" : "outline"
                      }
                      onClick={() => props.setTags(tag.name)}
                    >
                      {tag.name}
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
