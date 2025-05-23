import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import CalendarComponent from "./CalendarComponent";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { postSchema, PostSchema } from "@/lib/schema/schema";
import { Button } from "@/components/ui/button";
import { FieldErrors } from "react-hook-form";

const fakeTags = [
  { id: 1, name: "tag1" },
  { id: 2, name: "tag2" },
  { id: 3, name: "tag3" },
  { id: 4, name: "tag4" },
  { id: 5, name: "tag5" },
];
type Tag = {
  id: number;
  name: string;
};
const Post = () => {
  const [images, setImages] = useState<File[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const {
    register,
    handleSubmit,
    control,
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

  const onSubmit = (data: PostSchema) => {
    console.log("Form Data:", data);
    console.log("Images:", images); // images from useState
    // Send data + images to API
  };
  const onError = (errors: FieldErrors<PostSchema>) => {
    console.error("Validation Errors:", errors);
  };
  const handleTagClick = (tag: Tag) => {
    setTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages([...images, ...Array.from(e.target.files)]);
    }
  };
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
          <input
            type="hidden"
            value={JSON.stringify(tags)}
            {...register("tags")}
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
                  begin
                  value={field.value}
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
                  begin={false}
                  value={field.value}
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
          <div className="border border-black rounded-2xl p-3 gap-1 flex flex-wrap">
            {fakeTags.map((tag) => (
              <Badge
                className={`cursor-pointer rounded-full `}
                variant={tags.includes(tag) ? "default" : "outline"}
                key={tag.id}
                onClick={() => handleTagClick(tag)}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
        <div className="w-full">
          <div className="grid w-full  items-center justify-center gap-1.5 mb-3">
            <Label htmlFor="images">Images</Label>
            <Input type="file" id="images" onChange={handleFileUpload} />
          </div>
          <div className="p-2 grid grid-cols-2 w-full justify-center items-center  gap-1.5">
            {images &&
              Array.from(images).map((image) => (
                <div className="relative">
                  <img
                    key={image.name}
                    src={URL.createObjectURL(image)}
                    alt="uploaded image"
                    className=" w-full aspect-square object-cover border border-black rounded-xl shadow-xl "
                  />
                  <div
                    className="absolute top-1 right-1 cursor-pointer bg-neutral-800 text-white rounded-full px-3 py-1"
                    onClick={() => {
                      setImages(images.filter((i) => i.name !== image.name));
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

export default Post;
