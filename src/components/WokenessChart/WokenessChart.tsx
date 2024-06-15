import { WokenessChartBar } from "./WokenessChartBar";

interface WokenessChartProps {
  details: {
    susBranches: number;
    totalBranches: number;
    wokeBranches: number;
  };
}

export const WokenessChart = ({ details }: WokenessChartProps): JSX.Element => {
  const okayBranches =
    details.totalBranches - (details.susBranches + details.wokeBranches);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "end",
        justifyContent: "center",
        gap: 20,
      }}
    >
      <WokenessChartBar
        color="#FF5742"
        size={details.susBranches / details.totalBranches}
        label={`${details.susBranches} repos with sus branch names`}
      />
      <WokenessChartBar
        color="#3585FC"
        size={details.wokeBranches / details.totalBranches}
        label={`${details.wokeBranches} repos with woke branch names`}
      />
      <WokenessChartBar
        color="#A77A5B"
        size={okayBranches / details.totalBranches}
        label={`${okayBranches} repos with okay branch names`}
      />
    </div>
  );
};
