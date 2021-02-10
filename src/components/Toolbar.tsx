import { useState } from 'react'
import { GameOptions, useGameContext, Difficulty, Theme, Opponent } from '../contexts'
import { GameProgress, NumberOfMines } from '../globals'
// import './Toolbar.scss'
import './StartMenu.scss'

function Toolbar(props: any) {
  const [revealed, setRevealed] = useState<boolean>(false)
  console.log(revealed)

  return (
    <div className='start-menu-container' id={revealed ? 'revealed' : ''}>
      <span id='start-menu-icon'
            onClick={() => setRevealed(!revealed)}
            data-testid='toolbar-toggler'
      >
      </span>
      {/* <span className={revealed ? 'toolbar-icon revealed' : 'toolbar-icon'} 
            onClick={() => setRevealed(!revealed)}
            data-testid='toolbar-toggler'
      >
      </span> */}
      {
        revealed && (
          <div className='start-menu-options-container'>
            <h4>Options</h4>
            <hr/>
            {
              GameOptions && Object.entries(GameOptions).map(([setting, options], i) => (
                <Toggler key={i} setting={setting} options={options} />
              ))
            }
          </div>
        )
      }
    </div>
  )
}

function Toggler({setting, options}: { setting: string, options: string[]}) {
  const { setDifficulty, setTheme, setOpponent, setGameProgress, setNumberOfMines } = useGameContext()

  // TODO: Refactor this logic to make it conform to typescript standards.
  const handleChange = (option: string) => {
    switch(option) {
      case 'easy':
        setDifficulty(Difficulty.Easy)
        setGameProgress(GameProgress.NewGame)
        setNumberOfMines(NumberOfMines.Easy)
        break
      case 'regular':
        setDifficulty(Difficulty.Regular)
        setGameProgress(GameProgress.NewGame)
        setNumberOfMines(NumberOfMines.Regular)
        break
      case 'hard':
        setDifficulty(Difficulty.Hard)
        setGameProgress(GameProgress.NewGame)
        setNumberOfMines(NumberOfMines.Hard)
        break
      case 'test':
        setDifficulty(Difficulty.Test)
        setGameProgress(GameProgress.NewGame)
        setNumberOfMines(NumberOfMines.Test)
        break
      case 'retro':
        setTheme(Theme.Retro)
        break
      case 'dusk':
        setTheme(Theme.Dusk)
        break
      case 'biden':
        setOpponent(Opponent.Biden)
        break
      case 'trump':
        setOpponent(Opponent.Trump)
        break
      default:
        return
    }
  }

  return (
    <div key={setting} className={`${setting}-select-container`}>
      <label htmlFor={setting}>{setting}</label>
      <select id={setting} data-testid='toolbar' key={setting} onChange={(event) => handleChange(event.target.value)}>
        {
          options.map((option: any, index: number) => (
            <option value={option} key={index}>{option}</option>
          ))
        }
      </select>
    </div>
  )
}

export default Toolbar
