import { useUserWokeness } from "../../hooks/useUserWokeness.js";

interface UserInfoProps {
  username?: string;
}

export const UserInfo = ({ username }: UserInfoProps): JSX.Element => {
  const [{ susScore }, loading] = useUserWokeness(username);

  if (loading) {
    // TODO: Better loading
    return <h1>LOADING</h1>;
  }

  return <div>{susScore}</div>;
};
