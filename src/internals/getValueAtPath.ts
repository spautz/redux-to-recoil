// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getValueAtPath = (state: any, pathParts: Array<string>): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let currentResult = state;
  let i = 0;
  while (currentResult && i < pathParts.length) {
    currentResult = currentResult[pathParts[i]];
    i++;
  }

  if (i === pathParts.length) {
    return currentResult;
  }
  return undefined;
};

export default getValueAtPath;
