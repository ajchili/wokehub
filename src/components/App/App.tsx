import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Header } from "../Header/Header.js";
import { Search } from "../Search/Search.js";
import { UserInfo } from "../UserInfo/UserInfo.js";
import { useSearch } from "@tanstack/react-router";

const queryClient = new QueryClient();

export const App = (): JSX.Element => {
  const { username } = useSearch({
    strict: false,
  });

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};
