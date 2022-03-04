import ResultsGraph from "./ResultsGraph";
import { intervalToDuration } from "date-fns";
import "./results.css";

export function formatTime(gameTime) {
  let userTime = intervalToDuration({ start: 0, end: gameTime });
  let formattedTime = ``;
  if (userTime.minutes) {
    formattedTime +=
      userTime.minutes === 1 ? `1 minute` : `${userTime.minutes} minutes`;
  }
  if (userTime.seconds && userTime.minutes) {
    formattedTime +=
      userTime.seconds === 1
        ? " and 1 second"
        : ` and ${userTime.seconds} seconds`;
  } else if (userTime.seconds) {
    formattedTime +=
      userTime.seconds === 1 ? "1 second" : `${userTime.seconds} seconds`;
  }

  return formattedTime;
}

export default function ResultsScreen(props) {
  const { answer, userScore, gameTime } = props;

  return (
    <div className="results-page-wrapper">
      <h1 className="graph-text">Statistics</h1>
      <h3 className="graph-text">
        {userScore
          ? `You got it with ${userScore} ${
              userScore > 1 ? "attempts" : "attempt"
            } in ${formatTime(gameTime)}!`
          : "Better luck tomorrow!"}
      </h3>
      <ResultsGraph answer={answer} userScore={userScore} />
    </div>
  );
}
