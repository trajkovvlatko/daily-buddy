export const convertToTimeZone = ({ date, timeZone }: { date: number; timeZone: string }) => {
  return new Date(date).toLocaleString('sv-SE', { timeZone: timeZone });
};
