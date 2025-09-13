export function LoadingProfilePage() {
  return (
    <div className="w-full  rounded-lg p-4 shadow animate-pulse bg-white">
      <div className="flex items-center space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-5 bg-gray-200 rounded" />
          <div className="h-5 bg-gray-200 rounded" />
        </div>
      </div>
      <div>
        <div className="mt-4 h-20 bg-gray-200 rounded w-full" />
        <div className="mt-4 h-5 bg-gray-200 rounded w-full" />
        <div className="mt-2 h-5 bg-gray-200 rounded w-full" />
      </div>
      <div className="flex items-center space-x-4">
        <div className="w-full h-[600px] bg-gray-200 " />
      </div>
    </div>
  );
}
