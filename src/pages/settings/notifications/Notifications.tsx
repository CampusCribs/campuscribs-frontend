import { useGetNotificationsInfinite } from "@/gen";
import useAuthenticatedClientConfig from "@/hooks/use-authenticated-client-config";
import { ArrowLeftIcon } from "lucide-react";

const Notifications = () => {
  const config = useAuthenticatedClientConfig();
  const { data } = useGetNotificationsInfinite({}, { ...config });
  return (
    <div>
      <div className=" pt-3">
        <div onClick={() => window.history.back()}>
          <ArrowLeftIcon size={40} />
        </div>
        <div className="flex items-center justify-center text-xl font-semibold mt-5">
          Notifications
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col mt-3 w-full py-5 rounded-lg">
            {data &&
              data.pages.map((item) =>
                item.data?.content?.map((item) => (
                  <div className="border w-full p-4">{item.content}</div>
                ))
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
