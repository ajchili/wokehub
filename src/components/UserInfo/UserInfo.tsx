import { useUserWokeness } from "../../hooks/useUserWokeness.js";
import { getSusScoreLabel, getWokenessScoreLabel } from "../../utils/scores.js";

interface UserInfoProps {
  username?: string;
}

export const UserInfo = ({ username }: UserInfoProps): JSX.Element => {
  const [{ susScore, wokeness, isWoke }, loading] = useUserWokeness(username);
  const susLabel = getSusScoreLabel(susScore);
  const wokenessLabel = getWokenessScoreLabel(wokeness);

  if (loading) {
    // TODO: Better loading
    return <h1>LOADING</h1>;
  }

  return (
    <div>
      {username} {isWoke ? "is" : "is not"} woke
      {susLabel} {susScore}
      {wokenessLabel}
    </div>
  );
};
