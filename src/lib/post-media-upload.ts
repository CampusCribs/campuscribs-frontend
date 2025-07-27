import {
  usePostPostsDraftsPostdraftidMedia,
  usePutPostsDraftsPostdraftidMediaMediaid,
} from "@/gen";
import useAuthenticatedClientConfig from "@/hooks/use-authenticated-client-config";
import { useState } from "react";

export function usePostDraftMediaUpload() {
  const [mediaIdState, setMediaId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const config = useAuthenticatedClientConfig();
  const { mutateAsync: putPostsDraftsPostdraftidMedia } =
    usePutPostsDraftsPostdraftidMediaMediaid({ ...config });
  const { mutateAsync: postPostsDraftsPostdraftidMedia } =
    usePostPostsDraftsPostdraftidMedia({
      ...config,
    });

  const upload = async (postDraftId: string, file: File) => {
    try {
      setUploading(true);
      setError(null);
      if (!postDraftId) {
        throw new Error("Post draft ID is required");
      }
      const { data } = await postPostsDraftsPostdraftidMedia({ postDraftId }); // call the actual endpoint
      if (!data) throw new Error("Failed to fetch upload URL");

      const { uploadUrl, mediaId } = data;
      const res = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      if (!res.ok) throw new Error("Upload failed");

      const { data: putPostsDraftsPostdraftidMediaData } =
        await putPostsDraftsPostdraftidMedia({ postDraftId, mediaId });
      if (!putPostsDraftsPostdraftidMediaData) {
        throw new Error("Failed to associate media with post draft");
      }

      setMediaId(mediaId);
      return mediaId;
    } catch (err: any) {
      setError(err.message || "Unknown error");
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    upload,
    mediaId: mediaIdState,
    uploading,
    error,
  };
}
