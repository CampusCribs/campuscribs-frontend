import { CircleX } from "lucide-react";

const Error = () => {
  return (
    <div className="flex w-full h-full justify-center items-center ">
      <div className="flex flex-col">
        <div className="flex justify-center mb-4">
          <CircleX size={82} />
        </div>
        <div>An Error Occured</div>
      </div>
    </div>
  );
};

export default Error;
