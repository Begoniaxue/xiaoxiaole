import React from 'react';
import { Tile, FRUIT_EMOJIS, Position } from '../types/game';

interface FruitTileProps {
  tile: Tile;
  isSelected: boolean;
  onClick: (pos: Position) => void;
}

const FruitTile: React.FC<FruitTileProps> = ({ tile, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(tile.position)}
      className={`
        w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20
        flex items-center justify-center
        text-3xl sm:text-4xl md:text-5xl
        rounded-xl
        transition-all duration-200
        cursor-pointer
        select-none
        ${isSelected
          ? 'ring-4 ring-yellow-400 scale-110 shadow-xl z-10'
          : 'hover:scale-105 hover:shadow-lg'
        }
        ${tile.isMatched
          ? 'animate-pulse scale-0 opacity-0'
          : ''
        }
        ${tile.isNew
          ? 'animate-bounce'
          : ''
        }
        bg-white/80
        backdrop-blur-sm
        shadow-md
        border-2 border-white/50
      `}
    >
      <span className="drop-shadow-md">
        {FRUIT_EMOJIS[tile.type]}
      </span>
    </button>
  );
};

export default FruitTile;
