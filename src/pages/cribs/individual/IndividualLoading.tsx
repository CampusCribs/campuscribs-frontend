const IndividualLoading = () => {
  return (
    <div className="w-full  rounded-lg shadow animate-pulse bg-white">
      <div className="flex">
        <div className="w-full aspect-square bg-gray-200 " />
      </div>
      <div className="flex items-center space-x-4 mt-5 p-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-200 rounded" />
          <div className="h-5 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="flex  flex-col p-4 gap-y-4">
        <div className=" h-30 bg-gray-200 rounded w-full" />
        <div className=" h-5 bg-gray-200 rounded w-full" />
        <div className=" h-5 bg-gray-200 rounded w-full" />
        <div className=" h-5 bg-gray-200 rounded w-full" />
        <div className=" h-5 bg-gray-200 rounded w-full" />
        <div className=" h-30 bg-gray-200 rounded w-full" />
        <div className="flex flex-row-reverse">
          <div className=" h-10 bg-gray-200 rounded-full w-20 " />
        </div>
      </div>
    </div>
  );
};

export default IndividualLoading;
