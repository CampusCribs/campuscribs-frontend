import { Card, CardContent, CardFooter } from "@/components/ui/card";

const SmallAd = ({
  url,
  thumbnail,
  id,
  hook,
}: {
  url: string;
  thumbnail: string;
  id: string;
  hook?: string;
}) => {
  return (
    <a href={`https://${url}`}>
      <Card
        className="rounded-none shadow-none m-0 w-full border-none cursor-pointer p-1"
        key={id}
      >
        <CardContent className="p-0 m-0 w-full border-none aspect-[4/3] ">
          <img
            src={thumbnail}
            alt="Residence"
            className="object-cover aspect-[4/3] w-full h-full"
          />
        </CardContent>
        <CardFooter className="p-0 m-0 w-full px-4 pb-2">
          <div className="flex justify-between  w-full ">
            <div className="flex flex-col">
              <div className="text-md font-bold">{hook}</div>
              <div className="text-sm text-gray-500">sponsored</div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </a>
  );
};

export default SmallAd;
