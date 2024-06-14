import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const PAGE_SIZE = 100;

function reduceRepoPages(pages: any[] = []): Record<string, string[]> {
  const data: Record<string, string[]> = {};

  for (const page of pages) {
    for (const repo of page) {
      if (!(repo.default_branch in data)) {
        data[repo.default_branch] = [];
      }

      data[repo.default_branch].push(repo.name);
    }
  }

  return data;
}

export const useUserReposByBranch = (username?: string): [Record<string, string[]>, boolean] => {
  const query = useInfiniteQuery({
    queryKey: ["repos", username],
    queryFn: async ({ pageParam, queryKey }) => {
      const [_api, queryUsername] = queryKey;
      const result = await fetch(
        `https://api.github.com/users/${queryUsername}/repos?per_page=${PAGE_SIZE}&page=${pageParam}`
      );
      return await result.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, _allPages, lastPageParam) => {
      if (lastPage.length === 0 || lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (_firstPage, _allPages, firstPageParam) => {
      if (firstPageParam <= PAGE_SIZE) {
        return undefined;
      }
      return firstPageParam - 1;
    },
    enabled: username !== undefined,
  });

  useEffect(() => {
    if (query.isFetching || !query.hasNextPage) {
      return;
    }

    query.fetchNextPage();
  }, [query.data?.pages.length]);

  return [reduceRepoPages(query.data?.pages), query.isFetching];
};
