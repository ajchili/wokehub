import { WokenessChart } from "@/components/WokenessChart/WokenessChart";
import { SUS_BRANCH_NAMES, WOKE_BRANCH_NAMES } from "@/contants/github";

function processDetailsFromData(data: Record<string, string[]>) {
  const entries = Object.entries(data);
  return {
    totalBranches: entries.reduce(
      (repoSum, [_keys, repos]) => (repoSum += repos.length),
      0,
    ),
    susBranches: entries
      .filter(([branchName]) => SUS_BRANCH_NAMES.includes(branchName))
      .reduce((repoSum, [_branchName, repos]) => (repoSum += repos.length), 0),
    wokeBranches: entries
      .filter(([branchName]) => WOKE_BRANCH_NAMES.includes(branchName))
      .reduce((repoSum, [_branchName, repos]) => (repoSum += repos.length), 0),
  };
}

// TODO: add octokit types for response for data
export const Repos = ({
  username,
  data,
}: {
  username: string;
  data: Record<string, string[]>;
}) => {
  const { wokeBranches, totalBranches, susBranches } =
    processDetailsFromData(data);
  const wokeness = parseFloat((wokeBranches / totalBranches).toFixed(2));
  const susScore = parseFloat((susBranches / totalBranches).toFixed(2));
  const isWoke = wokeness >= 0.5 || susScore < 0.3;

  const details = {
    susBranches,
    totalBranches,
    wokeBranches,
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="flex text-4xl font-bold">repos for {username}</h1>
      <WokenessChart details={details} />
    </div>
  );
};
