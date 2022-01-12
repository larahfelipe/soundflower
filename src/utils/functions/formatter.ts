export function formatTime(rawTime: number) {
  if (!rawTime || rawTime === 0) return '';

  const parsedDate = new Date(rawTime);
  const minutes = parsedDate.getMinutes();
  const seconds = parsedDate.getSeconds();

  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}
