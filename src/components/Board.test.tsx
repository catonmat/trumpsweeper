import { render, screen } from '@testing-library/react';
import { defaultBoardState, regularBoardState, hardBoardState } from '../globals'
import Board from './Board'

test('it renders in the DOM', () => {
  render(<Board/>)
})

describe('buildBoard()', () => {
  it('should build a new board and store it in state if it is a new game', () => {
    render(<Board {...defaultBoardState}/>)

    const renderedBoard = screen.getByTestId('board')

    expect(renderedBoard.children.length).toEqual(25)
  })

  it('should not build a new board if a game is in progress', () => {
  })

  it('should build a 5x5 grid with 1 mine for an Easy game.', () => {
    render(<Board {...defaultBoardState}/>)

    const renderedBoard = screen.getByTestId('board')

    expect(renderedBoard.children.length).toEqual(25)
  })

  it('should build a 10x10 grid with 5 mines for an Regular game.', () => {
    render(<Board {...regularBoardState}/>)

    const renderedBoard = screen.getByTestId('board')

    expect(renderedBoard.children.length).toEqual(100)
  })

  it('should build a 20x20 grid with 10 mines for an Hard game.', () => {
    render(<Board {...hardBoardState}/>)

    const renderedBoard = screen.getByTestId('board')

    expect(renderedBoard.children.length).toEqual(400)
  })
})

describe('clickBoard()', () => {
  it('should render the entire revealed board when the game is over', () => {
    // click on a cell
    // cell is a mine
    // flash a pop up window stating game is over
    // reveal contents of all cells
  })

  it('should end the game if the user clicks on a mine', () => {

  })

  it('should end the game if the user flags all mines on the board', () => {

  })

  it('should recursively open all cells that are not mines or nieighbors of mines if a user clicks on a blank cell', () => {

  })
})
