import { WokenessChart } from "../WokenessChart/WokenessChart.js";
import { useUserReposByBranch } from "../../hooks/useUserReposByBranch.js";
import { SUS_BRANCH_NAMES, WOKE_BRANCH_NAMES } from "../../contants/github.js";

interface UserInfoProps {
  username?: string;
}

function processDetailsFromData(data: Record<string, string[]>) {
  const entries = Object.entries(data);
  return {
    totalBranches: entries.reduce(
      (repoSum, [_keys, repos]) => (repoSum += repos.length),
      0
    ),
    susBranches: entries
      .filter(([branchName]) => SUS_BRANCH_NAMES.includes(branchName))
      .reduce((repoSum, [_branchName, repos]) => (repoSum += repos.length), 0),
    wokeBranches: entries
      .filter(([branchName]) => WOKE_BRANCH_NAMES.includes(branchName))
      .reduce((repoSum, [_branchName, repos]) => (repoSum += repos.length), 0),
  };
}

export const UserInfo = ({ username }: UserInfoProps): JSX.Element => {
  if (username === undefined) {
    return <></>;
  }

  const [details, loading] = useUserReposByBranch(username);

  if (loading) {
    // TODO: Better loading
    return <h1>LOADING</h1>;
  }
  const { wokeBranches, totalBranches, susBranches } =
    processDetailsFromData(details);
  const wokeness = parseFloat((wokeBranches / totalBranches).toFixed(2));
  const susScore = parseFloat((susBranches / totalBranches).toFixed(2));
  const isWoke = wokeness >= 0.5 || susScore < 0.3;

  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ flex: 1 }}>{isWoke ? "yes" : "no"}</h1>
      <div style={{ width: "100%", flex: 4 }}>
        <WokenessChart details={processDetailsFromData(details)} />
      </div>
    </div>
  );
};
