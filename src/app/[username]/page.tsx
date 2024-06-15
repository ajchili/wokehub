import { Repos } from "./repos";
import { Octokit } from "octokit";

interface RepoListReponse {
  user: {
    login: string;
    repositories: {
      nodes: {
        url: string;
        name: string;
        updatedAt: string;
        createdAt: string;
        defaultBranchRef: {
          name: string;
        };
      }[];
      pageInfo: {
        hasNextPage: boolean;
        endCursor: string;
      };
    };
  };
}

function reduceRepoPages(input: RepoListReponse): Record<string, string[]> {
  const data: Record<string, string[]> = {};

  for (const repo of input.user.repositories.nodes) {
    const { name, defaultBranchRef } = repo;
    const branchName = defaultBranchRef?.name;

    if (!data[branchName]) {
      data[branchName] = [];
    }

    data[branchName].push(name);
  }

  return data;
}

export default async function Home({
  params: { username },
}: {
  params: { username: string };
}) {
  const octokit = new Octokit({
    auth: process.env.GITHUB_PAT,
  });

  // NOTE: one thing that sucks about this is it not cacheable easily
  const repoInfo = (await octokit.graphql.paginate(
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
  )) as RepoListReponse;

  // convert back to the old data shape?
  const newRepoInfo = reduceRepoPages(repoInfo);

  return <Repos username={username} data={newRepoInfo} />;
}
