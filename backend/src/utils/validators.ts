export const isValidYouTubeURL = (url: string) => {
  const regex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
  const isValid = regex.test(url);

  return isValid;
};

export const isValidURL = (value: string) => {
  const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
  const isValid = regex.test(value);

  return isValid;
};
