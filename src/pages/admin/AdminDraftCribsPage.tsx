import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Dot } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router";

type Props = {};

const AdminDraftCribsPage = (props: Props) => {
  return (
    <div className="flex flex-col ">
      <div className="flex flex-row-reverse ">
        <div className="p-4 text-blue-500 font-bold">Thumbnails</div>
      </div>
      <div className="grid grid-cols-2 gap-1 place-items-center">
        <ResidenceCard
          thumbnail="https://picsum.photos/200/300?random=1"
          id="1"
        />
        <ResidenceCard
          thumbnail="https://picsum.photos/200/300?random=2"
          id="2"
        />
      </div>
    </div>
  );
};

export default AdminDraftCribsPage;

const ResidenceCard = ({
  thumbnail,
  id,
}: {
  thumbnail: string;
  id: string;
}) => {
  const navigate = useNavigate();
  thumbnail = "https://picsum.photos/200/300?random=";
  return (
    <Card
      className="rounded-none shadow-none m-0 w-full border flex items-center  justify-center cursor-pointer p-1"
      onClick={() => navigate(`/cribs/${id}`)}
      key={id}
    >
      <CardContent className="p-0 m-0 w-full border-none flex items-center justify-center">
        <img src={thumbnail} alt="Residence" className="object-cover" />
      </CardContent>
      <CardFooter className="p-0 m-0 w-full px-4 py-2">
        <div className="flex justify-between  w-full "></div>
      </CardFooter>
    </Card>
  );
};
