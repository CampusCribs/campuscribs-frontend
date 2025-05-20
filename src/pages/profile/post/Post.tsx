import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import CalendarComponent from "./CalendarComponent";

const Post = () => {
  return (
    <div>
      <div>
        <div className="px-3 pt-3">arrow</div>
        <div className="flex w-full justify-center text-xl font-semibold">
          Add Post
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full gap-y-4 py-5">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Title</Label>
          <Input type="text" id="title" placeholder="Title" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Description</Label>
          <Textarea id="description" placeholder="Description" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Price</Label>
          <Input type="text" id="price" placeholder="Price" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Roommates</Label>
          <Input type="text" id="roommates" placeholder="Roommates" />
        </div>
        <div className="grid w-full items-center justify-center gap-y-4">
          <Label htmlFor="calendarBegin">Begin</Label>
          <CalendarComponent begin />
          <CalendarComponent begin={false} />
        </div>
        <div className="p-5">
          <div className="border border-black rounded-2xl">
            render tags in here
          </div>
        </div>
        <div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="images">Images</Label>
            <Input type="file" id="images" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
