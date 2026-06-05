import React from 'react';
import { Tile, Position, BOARD_SIZE } from '../types/game';
import { useGameStore } from '../store/useGameStore';
import FruitTile from './FruitTile';

interface GameBoardProps {
  board: Tile[][];
}

const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  const { selectedTile, selectTile, isAnimating } = useGameStore();

  const handleClick = (pos: Position) => {
    if (isAnimating) return;
    selectTile(pos);
  };

  const isSelected = (pos: Position): boolean => {
    if (!selectedTile) return false;
    return selectedTile.row === pos.row && selectedTile.col === pos.col;
  };

  if (board.length === 0) {
    return (
      <div className="w-full aspect-square flex items-center justify-center">
        <div className="text-6xl animate-bounce">🍎🍋🍇</div>
      </div>
    );
  }

  return (
    <div
      className="grid gap-1 sm:gap-2 p-2 sm:p-4 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl backdrop-blur-md shadow-2xl border border-white/20"
      style={{
        gridTemplateColumns: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${BOARD_SIZE}, minmax(0, 1fr))`,
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <FruitTile
            key={tile.id}
            tile={tile}
            isSelected={isSelected({ row: rowIndex, col: colIndex })}
            onClick={handleClick}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
