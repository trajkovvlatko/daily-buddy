export const getDefaultDate = () => {
  const date = new Date();
  return date.toISOString().slice(0, 10);
};
