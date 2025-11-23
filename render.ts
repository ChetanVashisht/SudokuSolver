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

const getScreen = () => {
  const screen = new Screen({ smartCSR: true, title: "Playground" });

  screen.key(["q", "C-c"], () => {
    screen.destroy();
    process.exit(0);
  });
  return screen;
};

const renderCells = (boxProps: BoxOptions, sudoku: Sudoku) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const left = `${5 + i * 8}%`;
      const top = `${j * 11}%`;
      const box = new Box({ ...boxProps, left, top });
      box.setContent(sudoku.charAt(i * 9 + j) === "0" ? "" : sudoku.charAt(i * 9 + j));
      const colour = getColour(i, j);
      box.setBorderColors([colour]);
    }
  }
};

export const render = (sudoku: Sudoku) => {
  const screen = getScreen();
  const boxProps = getBoxProps(screen);
  renderCells(boxProps, sudoku);
  screen.render();
};
