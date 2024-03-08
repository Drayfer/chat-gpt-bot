export const downloadImage = (base64String: string, fileName: string) => {
  const a = document.createElement("a");
  a.href = base64String;
  a.download = fileName;
  a.click();
};
