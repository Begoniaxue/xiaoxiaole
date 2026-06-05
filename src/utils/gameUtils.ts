import {
  FruitType,
  FRUIT_TYPES,
  Tile,
  Position,
  BOARD_SIZE,
  MATCH_MIN,
} from '../types/game';

let idCounter = 0;
const generateId = (): string => `tile-${++idCounter}`;

const getRandomFruit = (): FruitType => {
  return FRUIT_TYPES[Math.floor(Math.random() * FRUIT_TYPES.length)];
};

const createTile = (row: number, col: number, type?: FruitType): Tile => ({
  id: generateId(),
  type: type || getRandomFruit(),
  position: { row, col },
  isMatched: false,
  isNew: false,
});

export const createBoard = (): Tile[][] => {
  let board: Tile[][];
  do {
    board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      const rowTiles: Tile[] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        let tile: Tile;
        do {
          tile = createTile(row, col);
        } while (hasInitialMatch(board, rowTiles, row, col, tile.type));
        rowTiles.push(tile);
      }
      board.push(rowTiles);
    }
  } while (!hasValidMoves(board));
  return board;
};

const hasInitialMatch = (
  board: Tile[][], currentRow: Tile[], row: number, col: number, type: FruitType): boolean => {
  if (col >= 2) {
    if (currentRow[col - 1].type === type && currentRow[col - 2].type === type) {
      return true;
    }
  }
  if (row >= 2) {
    if (board[row - 1][col].type === type && board[row - 2][col].type === type) {
      return true;
    }
  }
  return false;
};

export const isAdjacent = (pos1: Position, pos2: Position): boolean => {
  const rowDiff = Math.abs(pos1.row - pos2.row);
  const colDiff = Math.abs(pos1.col - pos2.col);
  return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
};

export const cloneBoard = (board: Tile[][]): Tile[][] => {
  return board.map(row => row.map(tile => ({ ...tile, position: { ...tile.position } })));
};

export const swapTiles = (board: Tile[][], pos1: Position, pos2: Position): Tile[][] => {
  const newBoard = cloneBoard(board);
  const temp = { ...newBoard[pos1.row][pos1.col] };
  newBoard[pos1.row][pos1.col] = {
    ...newBoard[pos2.row][pos2.col],
    position: { ...pos1 },
  };
  newBoard[pos2.row][pos2.col] = {
    ...temp,
    position: { ...pos2 },
  };
  return newBoard;
};

export const checkMatches = (board: Tile[][]): Position[] => {
  const matches: Set<string> = new Set();

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const type = board[row][col].type;

      let hCount = 1;
      while (col + hCount < BOARD_SIZE && board[row][col + hCount].type === type) {
        hCount++;
      }
      if (hCount >= MATCH_MIN) {
        for (let i = 0; i < hCount; i++) {
          matches.add(`${row}-${col + i}`);
        }
      }

      let vCount = 1;
      while (row + vCount < BOARD_SIZE && board[row + vCount][col].type === type) {
        vCount++;
      }
      if (vCount >= MATCH_MIN) {
        for (let i = 0; i < vCount; i++) {
          matches.add(`${row + i}-${col}`);
        }
      }
    }
  }

  return Array.from(matches).map(key => {
    const [row, col] = key.split('-').map(Number);
    return { row, col };
  });
};

export const markMatches = (board: Tile[][], matches: Position[]): Tile[][] => {
  const newBoard = cloneBoard(board);
  matches.forEach(pos => {
    newBoard[pos.row][pos.col].isMatched = true;
  });
  return newBoard;
};

export const removeMatches = (board: Tile[][]): Tile[][] => {
  const newBoard = cloneBoard(board);
  for (let col = 0; col < BOARD_SIZE; col++) {
    let writeRow = BOARD_SIZE - 1;
    for (let row = BOARD_SIZE - 1; row >= 0; row--) {
      if (!newBoard[row][col].isMatched) {
        if (row !== writeRow) {
          newBoard[writeRow][col] = {
            ...newBoard[row][col],
            position: { row: writeRow, col },
          };
        }
        writeRow--;
      }
    }
    while (writeRow >= 0) {
      newBoard[writeRow][col] = {
        ...createTile(writeRow, col),
        isNew: true,
      };
      writeRow--;
    }
  }
  return newBoard;
};

export const dropFruits = (board: Tile[][]): Tile[][] => {
  return removeMatches(board);
};

export const hasValidMoves = (board: Tile[][]): boolean => {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (col < BOARD_SIZE - 1) {
        const swapped = swapTiles(board, { row, col }, { row, col: col + 1 });
        if (checkMatches(swapped).length > 0) {
          return true;
        }
      }
      if (row < BOARD_SIZE - 1) {
        const swapped = swapTiles(board, { row, col }, { row: row + 1, col });
        if (checkMatches(swapped).length > 0) {
          return true;
        }
      }
    }
  }
  return false;
};

export const shuffleBoard = (board: Tile[][]): Tile[][] => {
  let newBoard: Tile[][];
  const allTypes: FruitType[] = [];
  board.forEach(row => {
    row.forEach(tile => allTypes.push(tile.type));
  });

  do {
    for (let i = allTypes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allTypes[i], allTypes[j]] = [allTypes[j], allTypes[i]];
    }

    newBoard = [];
    let idx = 0;
    for (let row = 0; row < BOARD_SIZE; row++) {
      const rowTiles: Tile[] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        rowTiles.push(createTile(row, col, allTypes[idx++]));
      }
      newBoard.push(rowTiles);
    }
  } while (checkMatches(newBoard).length > 0 || !hasValidMoves(newBoard));

  return newBoard;
};

export const clearNewFlags = (board: Tile[][]): Tile[][] => {
  return board.map(row =>
    row.map(tile => ({ ...tile, isNew: false }))
  );
};

export const clearMatchedFlags = (board: Tile[][]): Tile[][] => {
  return board.map(row =>
    row.map(tile => ({ ...tile, isMatched: false }))
  );
};
