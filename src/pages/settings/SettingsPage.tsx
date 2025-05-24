import { ArrowLeftIcon } from "lucide-react";
import React from "react";

type Props = {};

const settings = [
  {
    id: 1,
    name: "Notifications",
  },
  {
    id: 2,
    name: "Account",
  },
  {
    id: 3,
    name: "General",
  },
];
const SettingsPage = (props: Props) => {
  return (
    <div>
      <div className="px-3 pt-3">
        <div onClick={() => window.history.back()}>
          <ArrowLeftIcon size={40} />
        </div>
      </div>
      <div className="flex flex-col  my-4">
        {settings.map((setting, idx) => (
          <div
            key={setting.id}
            className={`px-6 py-3 cursor-pointer text-lg font-medium border-t ${
              idx === settings.length - 1 ? "border-b" : ""
            }`}
          >
            {setting.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
