// TODO: add octokit types for response for data
export const Repos = ({ username, data }: { username: string; data: any }) => (
  <div>
    <h2>repos for {username}</h2>
    <pre>{JSON.stringify(data, null, 2)}</pre>
  </div>
);
