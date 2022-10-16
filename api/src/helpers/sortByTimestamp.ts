interface ObjWithTimestamp {
  startTimestamp: number;
}

export const sortByTimestamp = (a: ObjWithTimestamp, b: ObjWithTimestamp) => {
  return a.startTimestamp - b.startTimestamp;
};
