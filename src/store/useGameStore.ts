import { create } from 'zustand';
import {
  GameState,
  GameActions,
  Position,
  GAME_DURATION,
  Tile,
} from '../types/game';
import {
  createBoard,
  isAdjacent,
  swapTiles,
  checkMatches,
  markMatches,
  removeMatches,
  hasValidMoves,
  shuffleBoard,
  clearNewFlags,
  clearMatchedFlags,
} from '../utils/gameUtils';

const ANIMATION_DELAY = 300;

type StoreState = GameState & GameActions;

export const useGameStore = create<StoreState>((set, get) => ({
  board: [],
  score: 0,
  timeLeft: GAME_DURATION,
  status: 'idle',
  selectedTile: null,
  draggedTile: null,
  isAnimating: false,

  startGame: () => {
    const board = createBoard();
    set({
      board,
      score: 0,
      timeLeft: GAME_DURATION,
      status: 'playing',
      selectedTile: null,
      draggedTile: null,
      isAnimating: false,
    });
  },

  resetGame: () => {
    set({
      board: [],
      score: 0,
      timeLeft: GAME_DURATION,
      status: 'idle',
      selectedTile: null,
      draggedTile: null,
      isAnimating: false,
    });
  },

  setDraggedTile: (pos: Position | null) => {
    set({ draggedTile: pos });
  },

  handleDragDrop: (from: Position, to: Position) => {
    const { status, isAnimating } = get();
    if (status !== 'playing' || isAnimating) return;
    if (from.row === to.row && from.col === to.col) return;
    if (!isAdjacent(from, to)) return;
    
    get().processSwap(from, to);
  },

  tickTimer: () => {
    const { timeLeft, status } = get();
    if (status !== 'playing') return;

    if (timeLeft <= 1) {
      set({ timeLeft: 0, status: 'gameover' });
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  selectTile: (pos: Position) => {
    const { status, selectedTile, isAnimating } = get();
    if (status !== 'playing' || isAnimating) return;

    if (!selectedTile) {
      set({ selectedTile: pos });
      return;
    }

    if (selectedTile.row === pos.row && selectedTile.col === pos.col) {
      set({ selectedTile: null });
      return;
    }

    if (!isAdjacent(selectedTile, pos)) {
      set({ selectedTile: pos });
      return;
    }

    get().processSwap(selectedTile, pos);
  },

  processSwap: async (pos1: Position, pos2: Position) => {
    set({ isAnimating: true, selectedTile: null });

    const { board } = get();
    const swappedBoard = swapTiles(board, pos1, pos2);
    set({ board: swappedBoard });

    await new Promise(resolve => setTimeout(resolve, ANIMATION_DELAY));

    const matches = checkMatches(swappedBoard);

    if (matches.length === 0) {
      const revertedBoard = swapTiles(swappedBoard, pos1, pos2);
      set({ board: revertedBoard, isAnimating: false });
      return;
    }

    await get().processMatches(swappedBoard);
  },

  processMatches: async (currentBoard: Tile[][]) => {
    let board = currentBoard;

    while (true) {
      const matches = checkMatches(board);
      if (matches.length === 0) break;

      board = markMatches(board, matches);
      set({ board });

      await new Promise(resolve => setTimeout(resolve, ANIMATION_DELAY));

      board = removeMatches(board);
      set({ board, score: get().score + matches.length * 10 });

      await new Promise(resolve => setTimeout(resolve, ANIMATION_DELAY));

      board = clearNewFlags(board);
      board = clearMatchedFlags(board);
      set({ board });
    }

    if (!hasValidMoves(board)) {
      board = shuffleBoard(board);
      set({ board });
      await new Promise(resolve => setTimeout(resolve, ANIMATION_DELAY));
    }

    set({ isAnimating: false });
  },
}));
