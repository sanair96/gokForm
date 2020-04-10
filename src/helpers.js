export const isEmpty = (val) => {
  if (val === null || val.trim() === "") return true;
  return false;
};
