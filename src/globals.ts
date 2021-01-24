import { createContext, useContext } from 'react'

// Cell Globals
// enum CellSkin {
//   unclicked = '/images/retro/flag.svg',
//   mine = '/images/retro/mine.png',
//   flag = '/images/retro/flag.svg',
//   blank = '/images/retro/blank.svg',
//   one = '/images/retro/1.svg',
//   two = '/images/retro/2.svg',
//   three = '/images/retro/3.svg',
//   four = '/images/retro/4.svg',
//   five = '/images/retro/5.svg',
//   six = '/images/retro/6.svg',
//   seven = '/images/retro/7.svg',
//   eight = '/images/retro/8.svg',
// }

export interface CellState {
  location: [number, number];
  clicked: boolean;
  mine: boolean;
  flagged: boolean;
  neighbors: number;
  style?: object;
  setStyle?: (cell: CellState) => object
  updateBoard?: (j: number, i:number, rightClick?: boolean) => void;
}

export const setCellStyle = ({location, clicked, mine, flagged, neighbors} : CellState) => {
  const style = { 
    backgroundImage: `url(/images/retro/unopened.svg)`,
    gridArea: `${location[0]}-${location[1]}`
  }

  if (flagged) {
    style.backgroundImage = `url(/images/retro/flag.svg)`
  } else if (clicked && mine) {
    style.backgroundImage = `url(/images/retro/mine.png)`
  } else if (clicked && !mine && !flagged && neighbors === 0) {
    style.backgroundImage = `url(/images/retro/opened.svg)`
  } else if (clicked && !mine && !flagged && neighbors > 0) {
    style.backgroundImage = `url(/images/retro/${neighbors}.svg)`
  }

  return style;
}

// Board Globals
export enum GameProgress {
  NewGame = 'newGame',
  InProgress = 'inProgress',
  Won = 'won',
  Lost = 'lost',
  BeginNewGame = 'beginNewGame'
}

export enum BoardSize {
  Test = 5,
  Easy = 5,
  Regular = 10,
  Hard = 20,
}

export enum NumberOfMines {
  Test = 2,
  Easy = 3,
  Regular = 12,
  Hard = 188,
}

export interface BoardState {
  boardSize: BoardSize;
  numberOfMines: NumberOfMines;
  grid?: CellState[][];
  mineMap: [number, number][];
  flags: number;
  maxFlags: NumberOfMines;
  setFlags?: () => void;
}

// TODO: Consider refactoring these interface so you have one interface such that:
// { 
//   easy: {
//      gameProgress: gameProgress.Easy,
//      boardSize: boardSize.Easy,
//      numberOfMines: NumberOfMines.Easy
//   }
// }

export const easyBoardState: BoardState = {
  boardSize: BoardSize.Easy,
  numberOfMines: NumberOfMines.Easy,
  mineMap: [[-1,-1]],
  flags: 0,
  maxFlags: NumberOfMines.Easy,
}

export const regularBoardState: BoardState = {
  boardSize: BoardSize.Regular,
  numberOfMines: NumberOfMines.Regular,
  mineMap: [[-1,-1]],
  flags: 0,
  maxFlags: NumberOfMines.Regular,
}

export const hardBoardState: BoardState = {
  boardSize: BoardSize.Hard,
  numberOfMines: NumberOfMines.Hard,
  mineMap: [[-1,-1]],
  flags: 0,
  maxFlags: NumberOfMines.Hard,
}

// used only in Board.test.tsx
export const testBoardState: BoardState = {
  boardSize: BoardSize.Test,
  numberOfMines: NumberOfMines.Test,
  mineMap: [
    [2,1],
    [3,2]
  ],
  flags: 0,
  maxFlags: NumberOfMines.Test,
}

// TODO: Refactor `setCell`, `openedCell`, `closedCell` and `completedTestBoardState`; these exist only in Board.test.tsx 
export const setCell = (cell: CellState, location: [number, number], neighbors : number, mine?: boolean) => {
  cell.location = location
  cell.neighbors = neighbors
  cell.mine = mine ? true : false
  cell.style = setCellStyle(cell)
  return cell
}

export const openedCell: CellState = {
  location: [0, 0],
  clicked: true,
  mine: false,
  flagged: false,
  neighbors: 0,
}

export const closedCell: CellState = {
  location: [0, 0],
  clicked: false,
  mine: false,
  flagged: false,
  neighbors: 0,
}

// TODO: Refactor this and plce it in a new /utils.tsx file
class TestCell implements CellState {
  location: [number, number];
  clicked: boolean;
  flagged: boolean;
  mine: boolean;
  neighbors: number;
  style?: object;

  constructor({location, clicked, mine, flagged, neighbors} : CellState) {
    this.location = location;
    this.clicked = clicked;
    this.mine = mine;
    this.flagged = flagged;
    this.neighbors = neighbors;
    this.style = this.setSkin()
  }

  setSkin() {
    return setCellStyle(this)
  }
}

export const ongoingTestBoardState: BoardState = {
  boardSize: BoardSize.Test,
  numberOfMines: NumberOfMines.Test,
  mineMap: [
    [2,1],
    [3,2]
  ],
  flags: 0,
  maxFlags: NumberOfMines.Test,
  grid: [
    [ 
      new TestCell({ location: [0,0], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,1], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,2], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,3], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [1,0], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,1], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,2], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,3], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [1,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [2,0], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [2,1], clicked: false, mine: true, flagged: false, neighbors: 1}),
      new TestCell({ location: [2,2], clicked: true, mine: false, flagged: false, neighbors: 2}),
      new TestCell({ location: [2,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [2,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [3,0], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [3,1], clicked: false, mine: true, flagged: false, neighbors: 2}),
      new TestCell({ location: [3,2], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [3,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [3,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [4,0], clicked: false, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [4,1], clicked: false, mine: true, flagged: false, neighbors: 1}),
      new TestCell({ location: [4,2], clicked: false, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [4,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [4,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ]
  ]
}

export const completedTestBoardState : BoardState = {
  boardSize: BoardSize.Test,
  numberOfMines: NumberOfMines.Test,
  flags: 0,
  maxFlags: NumberOfMines.Test,
  mineMap: [
    [2,1],
    [3,2]
  ],
  grid: [
    [ 
      new TestCell({ location: [0,0], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,1], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,2], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,3], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [0,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [1,0], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,1], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,2], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [1,3], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [1,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [2,0], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [2,1], clicked: false, mine: true, flagged: true, neighbors: 1}), // mine
      new TestCell({ location: [2,2], clicked: true, mine: false, flagged: false, neighbors: 2}),
      new TestCell({ location: [2,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [2,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [3,0], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [3,1], clicked: true, mine: false, flagged: false, neighbors: 2}),
      new TestCell({ location: [3,2], clicked: false, mine: true, flagged: true, neighbors: 1}), // mine
      new TestCell({ location: [3,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [3,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ],
    [ 
      new TestCell({ location: [4,0], clicked: true, mine: false, flagged: false, neighbors: 0}),
      new TestCell({ location: [4,1], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [4,2], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [4,3], clicked: true, mine: false, flagged: false, neighbors: 1}),
      new TestCell({ location: [4,4], clicked: true, mine: false, flagged: false, neighbors: 0})
    ]
  ]
}

// Board Context
export const BoardContext = createContext<BoardState>({
  boardSize: BoardSize.Easy,
  numberOfMines: NumberOfMines.Easy,
  mineMap: [[-1,-1]],
  flags: 0,
  maxFlags: NumberOfMines.Easy,
})

export const useBoardContext = () => useContext(BoardContext)
