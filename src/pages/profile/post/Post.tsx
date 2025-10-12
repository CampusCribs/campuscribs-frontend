import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import CalendarComponent from "./CalendarComponent";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostSchema } from "@/lib/schema/schema";
import { Button } from "@/components/ui/button";
import { FieldErrors } from "react-hook-form";
import { toZonedTime } from "date-fns-tz";
import {
  useGetPublicTags,
  usePutPostsDrafts,
  useDeletePostsDraftsPostdraftidMediaDeleteMediaid,
  useGetUsersMe,
} from "@/gen";
import useAuthenticatedClientConfig from "@/hooks/use-authenticated-client-config";
import { useEnsurePostDraft } from "@/hooks/use-get-post-drafts";
import { usePostDraftMediaUpload } from "@/lib/post-media-upload";
import { useNavigate } from "react-router";

type postTag = {
  id?: string;
  name?: string;
  tagCategoryId?: string;
};

const Post = () => {
  const config = useAuthenticatedClientConfig();

  const navigate = useNavigate();

  const [selectedTags, setSelectedTags] = useState<postTag[]>([]);

  const editDraft = usePutPostsDrafts({
    ...config,
  });

  const { mutateAsync: deleteMedia } =
    useDeletePostsDraftsPostdraftidMediaDeleteMediaid({
      ...config,
    });
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useGetUsersMe({ ...config });

  const {
    upload,
    mediaId,
    uploading,
    error: uploadError,
  } = usePostDraftMediaUpload();

  const {
    data: tags,
    error: tags_error,
    isLoading: tags_isLoading,
  } = useGetPublicTags({});

  const {
    postDraft,
    loading: postDraftLoading,
    error: postDraftError,
    refetch: refetchPostDraft,
  } = useEnsurePostDraft();

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      roommates: 0,
      beginDate: new Date(),
      endDate: new Date(),
      tags: [],
    },
  });
  const onSubmit = (updatedPost: PostSchema) => {
    const response = editDraft.mutateAsync({
      data: {
        ...updatedPost,
        tags: selectedTags.map((tag) => ({
          id: tag.id,
          name: tag.name,
        })),
        termStartDate: updatedPost.beginDate.toISOString(),
        termEndDate: updatedPost.endDate.toISOString(),
        submit: true,
      },
    });
    response
      .then((res) => {
        alert(res.status + " Post updated successfully!");
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error updating post:", error);
        alert("Failed to update post. Please try again.");
      });
  };
  const onError = (errors: FieldErrors<PostSchema>) => {
    console.error("Validation Errors:", errors);
  };
  const handleTagClick = (tag: postTag) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !postDraft?.id) return;

    if ((postDraft.media && postDraft.media?.length >= 5) || false) {
      alert("You can only upload up to 5 images.");
      return;
    }
    upload(postDraft.id, files[0])
      .then(() => refetchPostDraft())
      .catch((err) => {
        console.error("Error uploading file:", err);
        alert("Failed to upload image. Please try again.");
      });
    // reset the input value to allow re-uploading the same file
    e.target.value = "";
  };

  console.log(tags);
  useEffect(() => {
    if (postDraft && tags?.data) {
      reset({
        title: postDraft.title,
        description: postDraft.description,
        price: postDraft.price,
        roommates: postDraft.roommates,
        beginDate: toZonedTime(postDraft.termStartDate || "", "UTC"),
        endDate: toZonedTime(postDraft.termEndDate || "", "UTC"),
        tags: postDraft.tags,
      });

      // Ensure selected tags align with the full tag list
      const matchedTags = tags.data.filter((tag) =>
        postDraft.tags?.some((t) => t.id === tag.id)
      );
      setSelectedTags(matchedTags);
    }
  }, [postDraft?.id, tags?.data, reset]);

  useEffect(() => {
    setValue("tags", selectedTags, { shouldValidate: true });
  }, [selectedTags, setValue]);
  if (postDraftLoading) {
    return <div>Loading...</div>;
  }
  if (postDraftError) {
    return <div>Error: {postDraftError}</div>;
  }
  return (
    <div>
      <div>
        <div className="px-3 pt-3">
          <div onClick={() => window.history.back()}>
            <ArrowLeftIcon size={40} />
          </div>
        </div>
        <div className="flex w-full justify-center text-xl font-semibold">
          Add Post
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col items-center justify-center w-full h-full gap-y-4 py-5"
      >
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="title">Title</Label>
          <Input
            {...register("title")}
            type="text"
            id="title"
            placeholder="Title"
          />
          {errors.title && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="description">Description</Label>
          <Textarea
            {...register("description")}
            id="description"
            placeholder="Description"
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="price">Price</Label>
          <Input
            {...register("price", { valueAsNumber: true })}
            type="number"
            id="price"
            placeholder="Price"
          />
          {errors.price && (
            <p className="text-sm text-red-500">{errors.price.message}</p>
          )}
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="roommates">Roommates</Label>
          <Input
            type="number"
            {...register("roommates", { valueAsNumber: true })}
            id="roommates"
            placeholder="Roommates"
          />
          {errors.roommates && (
            <p className="text-sm text-red-500">{errors.roommates.message}</p>
          )}
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <input
                type="hidden"
                {...field}
                value={JSON.stringify(selectedTags)} // this is okay *only* if you omit `field.value`
                onChange={() => {}} // prevent React warning: input is read-only
              />
            )}
          />
        </div>
        <div className="flex flex-col w-full items-center justify-center gap-y-4">
          <Controller
            name="beginDate"
            control={control}
            render={({ field }) => (
              <div>
                <Label>Begin Date</Label>
                <CalendarComponent
                  value={field.value ?? new Date()}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          {errors.beginDate && (
            <p className="text-sm text-red-500">{errors.beginDate.message}</p>
          )}
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <div>
                <Label>End Date</Label>
                <CalendarComponent
                  value={field.value ?? new Date()}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          {errors.endDate && (
            <p className="text-sm text-red-500">{errors.endDate.message}</p>
          )}
        </div>

        <div className="p-5">
          <Label className="text-lg ml-3 font-semibold">Tags</Label>
          <div className="border border-black rounded-2xl p-3 gap-x-1 gap-y-3 flex flex-wrap">
            {tags_error && <p className="text-red-500">Error loading tags</p>}
            {tags_isLoading && <p className="text-gray-500">Loading tags...</p>}
            {tags && (
              <TagComponent
                tags={tags.data}
                selectedTags={selectedTags}
                onTagClick={handleTagClick}
              />
            )}
          </div>
        </div>
        <div className="w-full">
          <div className="grid w-full  items-center justify-center gap-1.5 mb-3">
            <Label htmlFor="images">Images</Label>
            <Input
              type="file"
              id="images"
              onChange={(e) => handleFileUpload(e)}
              disabled={uploading || postDraftLoading || !postDraft?.id}
            />
          </div>
          <div className="p-2 grid grid-cols-2 w-full justify-center items-center  gap-1.5">
            {postDraft?.media &&
              Array.from(postDraft.media).map((image) => (
                <div className="relative">
                  <img
                    key={image.id}
                    src={
                      import.meta.env.VITE_MINIO_DRAFTMEDIA_ENDPOINT +
                      "/users/" +
                      user?.data.id +
                      "/" +
                      postDraft.id +
                      "/" +
                      image?.mediaId
                    }
                    alt="uploaded image"
                    className=" w-full aspect-square object-cover border border-black rounded-xl shadow-xl "
                  />
                  <div
                    className="absolute top-1 right-1 cursor-pointer bg-neutral-800 text-white rounded-full px-3 py-1"
                    onClick={() => {
                      if (!postDraft?.id) return;
                      deleteMedia({
                        postDraftId: postDraft?.id,
                        mediaId: image.id,
                      })
                        .then(() => {
                          refetchPostDraft();
                        })
                        .catch((err) => {
                          console.error("Error deleting media:", err);
                          alert("Failed to delete image. Please try again.");
                        });
                    }}
                  >
                    <X size={32} />
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex w-full justify-center items-center ">
          <div className="flex w-2/3 justify-end">
            <Button className="cursor-pointer" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

const TagComponent = ({
  tags,
  selectedTags,
  onTagClick,
}: {
  tags: postTag[];
  selectedTags: postTag[];
  onTagClick: (tag: postTag) => void;
}) => {
  return (
    <div className="flex flex-wrap p-4">
      <div className="w-1/2 my-2">
        <div className="text-lg font-semibold">Property Types</div>
        {(tags ?? [])
          .filter((tag): tag is { name: string; tagCategoryId: string } =>
            Boolean(tag?.name && tag.tagCategoryId === "property")
          )
          .map((tag) => (
            <Badge
              key={tag.name}
              className="cursor-pointer rounded-full"
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              onClick={() => onTagClick(tag)}
            >
              {tag.name}
            </Badge>
          ))}
      </div>
      <div className="w-1/2 my-2">
        <div className="text-lg font-semibold">Lease Types</div>
        {(tags ?? [])
          .filter((tag): tag is { name: string; tagCategoryId: string } =>
            Boolean(tag?.name && tag.tagCategoryId === "lease")
          )
          .map((tag) => (
            <Badge
              key={tag.name}
              className="cursor-pointer rounded-full"
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              onClick={() => onTagClick(tag)}
            >
              {tag.name}
            </Badge>
          ))}
      </div>
      <div className="w-1/2 my-2">
        <div className="text-lg font-semibold">Room Types</div>
        {(tags ?? [])
          .filter((tag): tag is { name: string; tagCategoryId: string } =>
            Boolean(tag?.name && tag.tagCategoryId === "room")
          )
          .map((tag) => (
            <Badge
              key={tag.name}
              className="cursor-pointer rounded-full"
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              onClick={() => onTagClick(tag)}
            >
              {tag.name}
            </Badge>
          ))}
      </div>
      <div className="w-1/2 my-2">
        <div className="text-lg font-semibold">Preferences</div>
        {(tags ?? [])
          .filter((tag): tag is { name: string; tagCategoryId: string } =>
            Boolean(tag?.name && tag.tagCategoryId === "preferences")
          )
          .map((tag) => (
            <Badge
              key={tag.name}
              className="cursor-pointer rounded-full"
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              onClick={() => onTagClick(tag)}
            >
              {tag.name}
            </Badge>
          ))}
      </div>
      <div className="w-1/2 my-2">
        <div className="text-lg font-semibold">Amenities</div>
        {(tags ?? [])
          .filter((tag): tag is { name: string; tagCategoryId: string } =>
            Boolean(tag?.name && tag.tagCategoryId === "amenities")
          )
          .map((tag) => (
            <Badge
              key={tag.name}
              className="cursor-pointer rounded-full"
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              onClick={() => onTagClick(tag)}
            >
              {tag.name}
            </Badge>
          ))}
      </div>
    </div>
  );
};

export default Post;
