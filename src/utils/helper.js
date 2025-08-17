export const extractTimeFromDate = (date) => {
  const newDate = new Date(date);

  const time = newDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // 12-hour format with AM/PM
  });

  return time;
};
