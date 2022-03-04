import formatTime from "./FormatTime.js";

test("Format time correctly formats time for minutes and seconds", () => {
  const string = "2 minutes and 6 seconds";
  expect(formatTime(126000)).toEqual(string);
});

test("Format time correctly formats time for minute and seconds", () => {
  const string = "1 minute and 6 seconds";
  expect(formatTime(66000)).toEqual(string);
});

test("Format time correctly formats time for minute", () => {
  const string = "1 minute";
  expect(formatTime(60000)).toEqual(string);
});

test("Format time correctly formats time for seconds", () => {
  const string = "6 seconds";
  expect(formatTime(6000)).toEqual(string);
});

test("Format time correctly formats time for second", () => {
  const string = "1 second";
  expect(formatTime(1000)).toEqual(string);
});

test("Format time correctly formats time for minute and second", () => {
  const string = "1 minute and 1 second";
  expect(formatTime(61000)).toEqual(string);
});
