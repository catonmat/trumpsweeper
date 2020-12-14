import { createContext, useContext } from 'react'

export enum Difficulty {
  Easy = 'easy',
  Regular = 'regular',
  Hard = 'hard',
}

export enum Theme {
  Retro = 'retro',
  Dusk = 'dusk',
}

export enum Opponent {
  Trump = 'trump',
  Biden = 'biden',
}

export interface GameContextType {
  state: {
    difficulty: Difficulty;
    theme: Theme;
    opponent: Opponent;
  };
  setDifficulty: (Difficulty: Difficulty) => void;
  setTheme: (Theme: Theme) => void;
  setOpponent: (Opponent: Opponent) => void;
}

export const GameContext = createContext<GameContextType>({
  state: {
    difficulty: Difficulty.Easy,
    theme: Theme.Retro,
    opponent: Opponent.Trump
  },
  setDifficulty: () => {console.log('enum context fire: difficulty')},
  setTheme: () => {console.log('enum context fire: theme')},
  setOpponent: () => {console.log('enum context fire: opponent')},
})

export const useSettings = () => useContext(GameContext)

interface Options {
  difficulty: string[];
  theme: string[];
  opponent: string[];
}

export const GameOptions: Options = {
  difficulty: [
    Difficulty.Easy,
    Difficulty.Regular,
    Difficulty.Hard,
  ],
  theme: Object.values(Theme),
  opponent: Object.values(Opponent),
}
