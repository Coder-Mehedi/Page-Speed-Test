export const isValidUrl = (url: any) => {
  const regex = new RegExp(
    '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
  );
  return regex.test(url);
};
