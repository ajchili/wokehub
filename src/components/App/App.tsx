import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { useSearch } from "@tanstack/react-router";

import { Header } from "../Header/Header.js";
import { Search } from "../Search/Search.js";
import { UserInfo } from "../UserInfo/UserInfo.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 1,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

export const App = (): JSX.Element => {
  const { username } = useSearch({
    strict: false,
  });

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Header />
        <Search username={username} />
        <UserInfo username={username} />
      </div>
    </PersistQueryClientProvider>
  );
};
