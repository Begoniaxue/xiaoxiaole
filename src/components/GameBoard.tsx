import React, { useState } from 'react';
import { Tile, Position, BOARD_SIZE } from '../types/game';
import { useGameStore } from '../store/useGameStore';
import FruitTile from './FruitTile';

interface GameBoardProps {
  board: Tile[][];
}

const GameBoard: React.FC<GameBoardProps> = ({ board }) => {
  const {
    selectedTile,
    draggedTile,
    isAnimating,
    selectTile,
    setDraggedTile,
    handleDragDrop,
  } = useGameStore();

  const [dragOverTile, setDragOverTile] = useState<Position | null>(null);

  const handleClick = (pos: Position) => {
    if (isAnimating) return;
    selectTile(pos);
  };

  const handleDragStart = (pos: Position) => {
    if (isAnimating) return;
    setDraggedTile(pos);
    setDragOverTile(null);
  };

  const handleDragEnd = () => {
    setDraggedTile(null);
    setDragOverTile(null);
  };

  const handleDragOver = (e: React.DragEvent, pos: Position) => {
    e.preventDefault();
    if (!draggedTile) return;
    if (draggedTile.row === pos.row && draggedTile.col === pos.col) return;
    setDragOverTile(pos);
  };

  const handleDragLeave = () => {
    setDragOverTile(null);
  };

  const handleDrop = (e: React.DragEvent, pos: Position) => {
    e.preventDefault();
    if (!draggedTile) return;
    
    handleDragDrop(draggedTile, pos);
    handleDragEnd();
  };

  const isSelected = (pos: Position): boolean => {
    if (!selectedTile) return false;
    return selectedTile.row === pos.row && selectedTile.col === pos.col;
  };

  const isDragged = (pos: Position): boolean => {
    if (!draggedTile) return false;
    return draggedTile.row === pos.row && draggedTile.col === pos.col;
  };

  const isDragOver = (pos: Position): boolean => {
    if (!dragOverTile) return false;
    return dragOverTile.row === pos.row && dragOverTile.col === pos.col;
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
            isDragged={isDragged({ row: rowIndex, col: colIndex })}
            isDragOver={isDragOver({ row: rowIndex, col: colIndex })}
            onClick={handleClick}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onDragLeave={handleDragLeave}
          />
        ))
      )}
    </div>
  );
};

export default GameBoard;
