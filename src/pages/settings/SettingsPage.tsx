import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";

const settings = [
  {
    id: 1,
    name: "Notifications",
    link: "/settings/notifications",
  },
  {
    id: 2,
    name: "Account",
    link: "/settings/account",
  },
  {
    id: 3,
    name: "General",
    link: "/settings/general",
  },
];
const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="px-3 pt-3">
        <div
          onClick={() => window.history.back()}
          className="cursor-pointer inline-flex items-center"
        >
          <ArrowLeftIcon size={32} />
          <span className="ml-2">Back</span>
        </div>
      </div>
      <div className="flex flex-col  my-4">
        {settings.map((setting, idx) => (
          <div
            key={setting.id}
            className={`px-6 py-3 cursor-pointer text-lg font-medium border-t ${
              idx === settings.length - 1 ? "border-b" : ""
            }`}
            onClick={() => navigate(setting.link)}
          >
            {setting.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
