import { Repos } from "./repos";
import { Octokit } from "octokit";

import { GITHUB_USER } from "@/queries/github-user";
import { GITHUB_ORG } from "@/queries/github-org";

export type Repo = {
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

export interface RepoListReponse {
  user: Repo;
  organization: Repo;
}

function reduceRepoPages(repoData: Repo): Record<string, string[]> {
  const data: Record<string, string[]> = {};

  for (const repo of repoData.repositories.nodes) {
    const { name, defaultBranchRef } = repo;
    const branchName = defaultBranchRef?.name;

    if (!branchName) {
      continue;
    }

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

  let repoInfo: Repo;

  // TODO: cache this shit
  try {
    console.log(`fetching user ${username}...`)
    const userReponse = (await octokit.graphql.paginate(GITHUB_USER, {
      username,
    })) as RepoListReponse;

    repoInfo = userReponse.user;
  } catch (error: any) {

    console.log(`fetching org ${username}...`)

    // TODO: error handle this
    const orgResponse = (await octokit.graphql.paginate(GITHUB_ORG, {
      username,
    })) as RepoListReponse;

    repoInfo = orgResponse.organization;
  }

  const newRepoInfo = reduceRepoPages(repoInfo);

  return <Repos username={username} data={newRepoInfo} />;
}
