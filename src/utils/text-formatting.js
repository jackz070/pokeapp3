export const capitalize = (string) =>
  string[0].toUpperCase() + string.substring(1);

export const replaceHyphenWithSpaceAndCapitalize = (string) => {
  let formattedItem = string.replace("-", " ");

  if (/\s/.test(formattedItem)) {
    formattedItem = formattedItem
      .split(" ")
      .map((word) => capitalize(word))
      .join(" ");
  }
  return capitalize(formattedItem);
};
