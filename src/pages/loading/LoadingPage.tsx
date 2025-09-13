import Lottie from "lottie-react";
import house from "@/components/ui/houseanimation.json"; // IMPORTANT: import, don't pass a string path
const LoadingPage = () => {
  return (
    <div className="flex flex-col w-full h-[500px] justify-center items-center">
      <div>
        <Lottie
          animationData={house}
          loop
          autoplay
          style={{ width: 200, height: 200 }}
        />
      </div>
      <div className="font-bold text-2xl">Loading...</div>
    </div>
  );
};

export default LoadingPage;
