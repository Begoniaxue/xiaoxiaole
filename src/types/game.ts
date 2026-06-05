export type FruitType = 'apple' | 'lemon' | 'grape' | 'orange' | 'kiwi';

export const FRUIT_EMOJIS: Record<FruitType, string> = {
  apple: '🍎',
  lemon: '🍋',
  grape: '🍇',
  orange: '🍊',
  kiwi: '🥝',
};

export const FRUIT_TYPES: FruitType[] = ['apple', 'lemon', 'grape', 'orange', 'kiwi'];

export interface Position {
  row: number;
  col: number;
}

export interface Tile {
  id: string;
  type: FruitType;
  position: Position;
  isMatched: boolean;
  isNew: boolean;
}

export type GameStatus = 'idle' | 'playing' | 'gameover';

export interface GameState {
  board: Tile[][];
  score: number;
  timeLeft: number;
  status: GameStatus;
  selectedTile: Position | null;
  isAnimating: boolean;
}

export interface GameActions {
  startGame: () => void;
  resetGame: () => void;
  selectTile: (pos: Position) => void;
  tickTimer: () => void;
  processSwap: (pos1: Position, pos2: Position) => Promise<void>;
  processMatches: (board: Tile[][]) => Promise<void>;
}

export const BOARD_SIZE = 5;
export const GAME_DURATION = 60;
export const MATCH_MIN = 3;
