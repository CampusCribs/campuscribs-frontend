import { useEffect, useState } from "react";
import useAuthenticatedClientConfig from "@/hooks/use-authenticated-client-config";
import { PostDraftDTO, useGetPostsDrafts, usePostPostsDrafts } from "@/gen";

export function useEnsurePostDraft() {
  const config = useAuthenticatedClientConfig();

  const [finalData, setFinalData] = useState<PostDraftDTO>(); // Replace 'any' with actual PostDraftDTO type
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getDraft = useGetPostsDrafts({
    ...config,
    query: {
      enabled: false,
    },
  });

  const createDraft = usePostPostsDrafts({
    ...config,
  });

  const ensureDraft = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await getDraft.refetch();
      console.log("Draft data:", data);
      if (data?.status === 200 && data.data) {
        setFinalData(data.data);
        return;
      }
    } catch (err: any) {
      // Assume 404 means draft doesn't exist
      if (err?.response?.status === 404 || err?.message === "No draft found") {
        try {
          const { data: created } = await createDraft.mutateAsync();
          console.log("Created new draft:", created);
          setFinalData(created);
        } catch (createErr: any) {
          setError(createErr.message || "Failed to create draft");
        }
      } else {
        setError(err.message || "Unknown error fetching draft");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ensureDraft();
  }, []);

  return {
    postDraft: finalData,
    loading,
    error,
    refetch: ensureDraft,
  };
}
