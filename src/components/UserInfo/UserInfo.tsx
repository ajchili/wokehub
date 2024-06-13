import { useUserReposByBranch } from "../../hooks/useUserReposByBranch.js";

interface UserInfoProps {
  username?: string;
}

export const UserInfo = ({ username }: UserInfoProps): JSX.Element => {
  const [userReposByBranch, loading] = useUserReposByBranch(username);

  if (loading) {
    // TODO: Better loading
    return <h1>LOADING</h1>;
  }

  return <div>{JSON.stringify(userReposByBranch)}</div>;
};
