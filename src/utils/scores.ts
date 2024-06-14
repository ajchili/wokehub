import {
  SUS_SCORE_EMOJI,
  SUS_SCORE_LABEL,
  WOKENESS_SCORE_EMOJI,
  WOKENESS_SCORE_LABEL,
} from "../contants/scores.js";

export function getSusScoreLabel(susScore: number): string {
  const maybeEmoji = SUS_SCORE_EMOJI[susScore] || "😬";
  let label: string;

  if (susScore in SUS_SCORE_LABEL) {
    label = SUS_SCORE_LABEL[susScore];
  } else if (susScore >= 0.8) {
    label = "sus";
  } else if (susScore >= 0.5) {
    label = "skibidi";
  } else {
    label = "yapper";
  }

  return [maybeEmoji, label].filter(Boolean).join(" ");
}

export function getWokenessScoreLabel(wokeness: number): string {
  const maybeEmoji = WOKENESS_SCORE_EMOJI[wokeness] || "☺️";
  let label: string;

  if (wokeness in WOKENESS_SCORE_LABEL) {
    label = WOKENESS_SCORE_LABEL[wokeness];
  } else if (wokeness >= 0.9) {
    label = "woke";
  } else if (wokeness >= 0.8) {
    label = "based";
  } else if (wokeness > 0.6) {
    label = "basic";
  } else if (wokeness >= 0.5) {
    label = "valid";
  } else {
    label = "mid";
  }

  return [maybeEmoji, label].filter(Boolean).join(" ");
}
