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
bigMap.set(3, [6, 7, 8, 15, 16, 17, 25, 26, 27]);
bigMap.set(4, [28, 29, 30, 37, 38, 39, 46, 47, 48]);
bigMap.set(5, [31, 32, 33, 40, 41, 42, 49, 50, 51]);
bigMap.set(6, [34, 35, 36, 43, 44, 45, 52, 53, 54]);
bigMap.set(7, [55, 56, 57, 64, 65, 66, 73, 74, 75]);
bigMap.set(8, [58, 59, 60, 67, 68, 69, 76, 77, 78]);
bigMap.set(9, [61, 62, 63, 70, 71, 72, 79, 80, 81]);

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
