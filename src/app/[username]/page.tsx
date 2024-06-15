import { Repos } from "./repos";
import { Octokit } from "octokit";

export default async function Home({
  params: { username },
}: {
  params: { username: string };
}) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
  });

  // NOTE: one thing that sucks about this is it not cacheable easily
  const repoInfo = await octokit.graphql.paginate(
    `query GetUsernameAndRepos($username: String!, $num: Int = 100, $cursor: String) {
        user(login: $username) {
          login,
          repositories(first: $num, after: $cursor, isFork: false) {
            nodes {
              url,
              name,
              updatedAt,
              createdAt,
              defaultBranchRef {
                name
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }  
          }
        }
      }`,
    {
      username,
    },
  );

  return <Repos username={username} data={repoInfo} />;
}
