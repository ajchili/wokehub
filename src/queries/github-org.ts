export const GITHUB_ORG = `query GetUsernameAndRepos($username: String!, $num: Int = 100, $cursor: String) {
  organization(login: $username) {
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
  },
}`;
