export const getYouTubeVideoId = (url: string) => {
  const videoIdRegex = /[?&]v=([^&#]+)/;
  const match = url.match(videoIdRegex);

  const result = match && match[1];

  return result;
};
