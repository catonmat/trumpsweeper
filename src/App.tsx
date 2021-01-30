import React from 'react';
import { GameContext, Difficulty, Theme, Opponent, Flags, } from './contexts'
import * as Global from './globals'
import Board from './components/Board'
import Toolbar from './components/Toolbar'
import TopPanel from './components/TopPanel'
import ModalCompletion from './components/ModalCompletion'
import Tweet from './components/Tweet'
import { trumpTweets } from './data/tweets'
import './App.scss';

// TODO: Add error boundaries to app: https://medium.com/@sgroff04/2-minutes-to-learn-react-16s-componentdidcatch-lifecycle-method-d1a69a1f753
function App() {
  const [difficulty, setDifficulty] = React.useState(Difficulty.Easy)
  const [theme, setTheme] = React.useState(Theme.Retro)
  const [opponent, setOpponent] = React.useState(Opponent.Trump)
  const [gameProgress, setGameProgress] = React.useState(Global.GameProgress.NewGame)
  const [flags, setFlags] = React.useState(Flags.Easy)
  const [rightClickHeldDown, setRightClickHeldDown] = React.useState(false)
  const [boardState] = React.useState(Global.easyBoardState)
  const [numberOfMines, setNumberOfMines] = React.useState(Global.NumberOfMines.Easy)

  function drawBoard(difficulty: string) {
    switch(difficulty) {
      case 'easy':
        return Global.easyBoardState
      case 'regular':
        return Global.regularBoardState
      case 'hard':
        return Global.hardBoardState
      case 'test':
        return Global.testBoardState
      default:
        throw new Error('Unable to draw board.')
    }
  }

  function maxFlags(board: Global.BoardState) {
    return board.maxFlags
  }

  return (
    <>
      <GameContext.Provider value={{
          difficulty,
          theme,
          opponent,
          gameProgress,
          flags,
          rightClickHeldDown,
          boardState, //TO DO: boardState is redundant
          numberOfMines,
          setDifficulty,
          setTheme,
          setOpponent,
          setGameProgress,
          setFlags,
          setRightClickHeldDown,
          setNumberOfMines
        }}>
        {/* <BoardContext.Provider> */}
        <h1>APP: </h1>
        <p>Difficulty: {difficulty}</p>
        <p>Progress: {gameProgress}</p>
        <p>Theme: {theme}</p>
        <p>Opponent: {opponent}</p>
        <p>Current Flags: {flags}</p>
        <p>Max Flags: {maxFlags(drawBoard(difficulty))}</p>
        <TopPanel/>
        <Board {...drawBoard(difficulty)}/>
        <Toolbar />
        <ModalCompletion/>
        <Tweet {...trumpTweets[0]}/>
      </GameContext.Provider>
    </>
  )
}

export default App;
