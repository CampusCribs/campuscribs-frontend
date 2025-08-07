import { axiosClient } from "@/lib/client"; // adjust import path
import { useInfiniteQuery } from "@tanstack/react-query";
type CuratedPost = {
  userId: string;
  format: string;
  id: string;
  mediaId: string;
  price: number;
};

type PaginatedResponse = {
  content: CuratedPost[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // current page
};

const fetchCuratedPage = async ({
  pageParam,
  selectedTags,
}: {
  pageParam: number;
  selectedTags: string[];
}): Promise<PaginatedResponse> => {
  const res = await axiosClient<PaginatedResponse>({
    method: "GET",
    url: "/public/curated",
    params: {
      page: pageParam,
      size: 10,
      sort: ["createdAt,desc"],
      tag: selectedTags,
    },
  });

  return res.data;
};

export const useCuratedInfiniteQuery = (selectedTags: string[]) =>
  useInfiniteQuery({
    queryKey: ["publicCurated", selectedTags],
    queryFn: ({ pageParam = 0 }) =>
      fetchCuratedPage({ pageParam, selectedTags }),
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return nextPage < lastPage.totalPages ? nextPage : undefined;
    },
    initialPageParam: 0,
  });
