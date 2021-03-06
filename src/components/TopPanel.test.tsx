import { screen, fireEvent, render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import StartMenu from './StartMenu'
import Board from './Board'
import TopPanel from './TopPanel'
import { testBoardState } from '../globals'

// shared examples
function toggleNewGameAndDifficulty(difficulty: string) {
  const toolbarToggler = screen.getByTestId('toolbar-toggler')
  fireEvent.click(toolbarToggler)
  
  const difficultySelect = screen.getByLabelText('difficulty')
  fireEvent.click(difficultySelect, { name: difficulty})
}

function assertTimer(callback: any) {
  const timer = screen.getByTestId('timer')
  let time = Number(timer.textContent)
  expect(timer).toBeInTheDocument()

  setTimeout(() => {
    callback && callback()
  }, 1500)

  return time
}

describe('Basic Functions', () => {
  beforeEach(()=>{
    jest.useFakeTimers();

    render(<TopPanel/>)
    render(<StartMenu/>)
  })

  describe('Timer', () => {
    xit('should report the time played during the game to the user', () => {
      const timer = screen.getByTestId('timer')
      expect(timer).toBeInTheDocument()
    })
    
    xit('should not start counting if the user has not clicked on a cell, or has not flagged a cell', () => {
      render(<Board {...testBoardState}/>)
      
      const timer = screen.getByTestId('timer')
      expect(timer).toBeInTheDocument()
      let time =  Number(timer.textContent)

      expect(time).toEqual(0)
    })

    xit('should start counting if the user clicks on a blank cell', () => {
      render(<Board {...testBoardState}/>)

      const callback = jest.fn();
      assertTimer(callback)
      expect(callback).not.toBeCalled()

      const cell = screen.getByTestId('0-0')
      fireEvent.click(cell)
      
      jest.advanceTimersByTime(10000)

      expect(callback).toBeCalled()
      expect(callback).toHaveBeenCalledTimes(1)
      // const time = assertTimer(callback)

      // TODO: fix asynchronous logic in app
      // expect(time).toBeGreaterThan(0)
    })

    xit('should reset the counter if the game is restarted', () => {
      render(<Board {...testBoardState}/>)

      const timer = screen.getByTestId('timer')
      expect(timer).toBeInTheDocument()

      const cell = screen.getByTestId('0-0')
      fireEvent.click(cell)

      let time
      setTimeout(()=>{
        time = Number(timer.textContent)
        expect(time).toBeGreaterThan(0)
      }, 1500)

      toggleNewGameAndDifficulty('regular')

      time = Number(timer.textContent)
      expect(time).toEqual(0)
    })  

    xit('should start counting if the user flags a cell', () => {
      render(<Board {...testBoardState}/>)

      const timer = screen.getByTestId('timer')
      expect(timer).toBeInTheDocument()
      const earlierTime = Number(timer.textContent)

      const cell = screen.getByTestId('0-0')
      fireEvent.contextMenu(cell)

      setTimeout(() => {
        const laterTime = Number(timer.textContent)

        expect(earlierTime).toBeLessThan(laterTime)
        expect(true).toEqual(false)
      }, 1500)
    })

    xit('should stop counting if the game ends', () => {
      render(<Board {...testBoardState}/>)

      const timer = screen.getByTestId('timer')
      expect(timer).toBeInTheDocument()
      const mineCell = screen.getByTestId('3-2')
      fireEvent.click(mineCell)

      let earlierTime = Number(timer.textContent)

      setTimeout(() => {
        const laterTime = Number(timer.textContent)

        expect(earlierTime).toEqual(laterTime)
      }, 1500)
    })
  })

  describe('Avatar', () => {
    xtest('it exists', () => {
      const avatar = screen.getByTestId('avatar')

      expect(avatar).toBeInTheDocument()
    })
  })

  describe('Flag Count', () => {
    xit('exists', () => {
      const flagCounter = screen.getByTestId('flag-counter')
      expect(flagCounter).toBeInTheDocument()
    })

    xit('should keep track of the current number of flags', () => {
      render(<Board {...testBoardState}/>)

      let flags = Number(screen.getByTestId('flag-counter').textContent)
      expect(flags).toEqual(0)

      const cell = screen.getByTestId('0-0')
      fireEvent.contextMenu(cell)

      flags = Number(screen.getByTestId('flag-counter').textContent)
      expect(flags).toEqual(1)
    })

    xit('should reset the flag count if the game ends', () => {
      render(<Board {...testBoardState}/>)

      let flags = Number(screen.getByTestId('flag-counter').textContent)
      expect(flags).toEqual(0)

      const cell = screen.getByTestId('0-0')
      fireEvent.contextMenu(cell)

      flags = Number(screen.getByTestId('flag-counter').textContent)
      expect(flags).toEqual(1)

      const toolbarToggler = screen.getByTestId('toolbar-toggler')
      fireEvent.click(toolbarToggler)
    
      const difficultySelect = screen.getByLabelText('difficulty')
      fireEvent.click(difficultySelect, { name: 'regular'})
      fireEvent.click(difficultySelect, { name: 'easy'})

      flags = Number(screen.getByTestId('flag-counter').textContent)
      expect(flags).toEqual(0)
    })
  })
})
