import { Box, BoxOptions, Screen } from "@unblessed/node";
import { Sudoku } from "./solver";

const getBoxProps = (screen: Screen) => {
  return {
    parent: screen,
    shadow: true,
    tags: true,
    width: 8,
    border: "line",
    height: 3,
    align: "center",
  } as BoxOptions;
};

const getColour: (i: number, j: number) => string = (i: number, j: number) => {
  switch ((Math.floor(i / 3) + Math.floor(j / 3)) % 3) {
    case 0:
      return "red";
    case 1:
      return "blue";
    default:
      return "green";
  }
};

let screen: Screen | null = null;
let boxes: Array<Box> = [];

export const getScreen = () => {
  if (screen === null) {
    screen = new Screen({ smartCSR: true, title: "Playground" });
  }
  return screen;
};

const range = (start: number, stop: number, step: number) =>
  Array.from({ length: Math.ceil((stop - start) / step) }, (_, i) => start + i * step);

export const getBoxes = (screen: Screen) => {
  const boxProps = getBoxProps(screen);
  if (boxes.length === 0) {
    boxes = range(0, 81, 1).map(_ => new Box({ ...boxProps }));
  }
  return boxes;
};

/** Pre existing cells are bold */
const colourIt = (sudoku: Sudoku, problem: Sudoku, index: number): string => {
  const cell = sudoku.charAt(index)!;
  return problem.at(index) === "0"
    ? `{#0ff0ff-fg}{bold}${cell}{/bold}{/#0ff0ff-fg}`
    : `{#ff0000-fg}${cell}{/#ff0000-fg}`;
};

const renderCells = (boxes: Box[], sudoku: Sudoku, problem: Sudoku): void => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const left = `${5 + j * 8}%`;
      const top = `${i * 11}%`;
      const index = i * 9 + j;
      const box = boxes.at(index)!;
      box.left = left;
      box.top = top;
      box.setContent(sudoku.charAt(index) === "0" ? "" : colourIt(sudoku, problem, index));
      const colour = getColour(i, j);
      box.setBorderColors([colour]);
    }
  }
};

export const render = (problem: Sudoku, sudoku: Sudoku): void => {
  const screen: Screen = getScreen();
  const boxes = getBoxes(screen);
  renderCells(boxes, sudoku, problem);
  screen.render();
};
