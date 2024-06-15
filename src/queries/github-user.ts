export const GITHUB_USER = `query GetUsernameAndRepos($username: String!, $num: Int = 100, $cursor: String) {
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
  },
}`;
