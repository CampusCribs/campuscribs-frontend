import React from "react";

const AdminDraftThumbnailPage = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row-reverse ">
        <div className="p-4 text-blue-500 font-bold">Thumbnails</div>
      </div>
      <div className="grid grid-cols-2 gap-1 place-items-center">
        <ThumbnailComponent
          thumbnail="https://picsum.photos/200/300?random=1"
          id="1"
        />
        <ThumbnailComponent
          thumbnail="https://picsum.photos/200/300?random=2"
          id="2"
        />
      </div>
    </div>
  );
};

export default AdminDraftThumbnailPage;

const ThumbnailComponent = ({
  thumbnail,
  id,
}: {
  thumbnail: string;
  id: string;
}) => {
  return (
    <div className="flex justify-center items-center flex-col">
      <img src={thumbnail} alt="Thumbnail" className="object-cover " />
      <div className="flex justify-between w-full px-5 py-2">
        {" "}
        <div className="text-blue-500  px-4 py-2 cursor-pointer">confirm</div>
        <div className="text-red-500  px-4 py-2 cursor-pointer">deny</div>
      </div>
    </div>
  );
};
