import { useEffect, useReducer } from "react";
import { SUS_BRANCH_NAMES, WOKE_BRANCH_NAMES } from "../contants/github.js";
import { useUserReposByBranch } from "./useUserReposByBranch.js";

interface State {
  details: {
    susBranches: number;
    wokeBranches: number;
    totalBranches: number;
  };
  wokeness: number;
  susScore: number;
}

const initialState: State = {
  details: { susBranches: 0, totalBranches: 0, wokeBranches: 0 },
  wokeness: 0,
  susScore: 0,
};

type Action = ProcessDataAction;

interface ProcessDataAction {
  type: "processData";
  data: Record<string, string[]>;
}

function processDetailsFromData(
  data: Record<string, string[]>
): State["details"] {
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

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "processData":
      const details = processDetailsFromData(action.data);
      state.details = details;
      state.wokeness = parseFloat(
        (details.wokeBranches / details.totalBranches).toFixed(2)
      );
      state.susScore = parseFloat(
        (details.susBranches / details.totalBranches).toFixed(2)
      );
      break;
  }

  return state;
};

export const useUserWokeness = (username?: string): [State, boolean] => {
  const [data, loading] = useUserReposByBranch(username);
  const [result, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (loading) {
      return;
    }

    dispatch({ type: "processData", data });
  }, [loading]);

  return [result, loading];
};
