export type Start = {};
export type AcceptBig = { input: string };
export type AcceptSmall = { input: string; big: number };
export type Terminal = { input: string; big: number; small: number };

export type State = Start | Terminal | AcceptBig | AcceptSmall;

export const updateState = (currentState: State, input: string): State => {
  const number = parseInt(input);
  if (isNaN(number) || number < 1 || number > 9) {
    return {};
  }

  if ("small" in currentState) {
    return { input };
  }

  /** Accept Small case */
  if ("big" in currentState) {
    return { ...currentState, small: number };
  }

  /** Big pending case */
  if ("input" in currentState) {
    return { ...currentState, big: number };
  }

  return { input };
};

export const isTerminalState = (currentState: State): boolean => {
  return "input" in currentState && "big" in currentState && "small" in currentState;
};

const bigMap = new Map<number, Array<number>>();
bigMap.set(1, [0, 1, 2, 9, 10, 11, 18, 19, 20]);
bigMap.set(2, [3, 4, 5, 12, 13, 14, 21, 22, 23]);
bigMap.set(3, [6, 7, 8, 15, 16, 17, 24, 25, 26]);
bigMap.set(4, [27, 28, 29, 36, 37, 38, 45, 46, 47]);
bigMap.set(5, [30, 31, 32, 39, 40, 41, 48, 49, 50]);
bigMap.set(6, [33, 34, 35, 42, 43, 44, 51, 52, 53]);
bigMap.set(7, [54, 55, 56, 63, 64, 65, 72, 73, 74]);
bigMap.set(8, [57, 58, 59, 66, 67, 68, 75, 76, 77]);
bigMap.set(9, [60, 61, 62, 69, 70, 71, 78, 79, 80]);

export const getIndex = (currentState: State): number => {
  if ("input" in currentState && "big" in currentState && "small" in currentState) {
    const bigbox = bigMap.get(currentState.big);
    if (!bigbox) {
      throw new Error("Invalid Row");
    }
    const cell = bigbox.at(currentState.small - 1);
    if (!cell) {
      throw new Error("Invalid Row");
    }
    return cell;
  }
  return -1;
};
