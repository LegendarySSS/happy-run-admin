export function formatTime(timestamp, format) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const formattedString = format.replace('Y', year).replace('M', month).replace('D', day);
  return formattedString;
}
