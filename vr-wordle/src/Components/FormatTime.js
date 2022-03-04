import { intervalToDuration } from "date-fns";

export default function formatTime(gameTime) {
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
