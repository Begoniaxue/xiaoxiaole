import React from 'react';
import { useGameStore } from '../store/useGameStore';
import { GAME_DURATION } from '../types/game';

const Timer: React.FC = () => {
  const { timeLeft, status } = useGameStore();
  const percentage = (timeLeft / GAME_DURATION) * 100;
  const isLow = timeLeft <= 10;

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-blue-400/20 to-cyan-400/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-blue-400/30 shadow-lg min-w-[140px]">
      <span className="text-sm font-medium text-blue-200 uppercase tracking-wider">时间</span>
      <span className={`text-3xl sm:text-4xl font-bold drop-shadow-lg ${
        isLow && status === 'playing' ? 'text-red-400 animate-pulse' : 'text-white'
      }`}>
        {timeLeft}s
      </span>
      <div className="w-full h-2 bg-white/20 rounded-full mt-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${
            isLow ? 'bg-gradient-to-r from-red-500 to-orange-500' : 'bg-gradient-to-r from-green-400 to-cyan-400'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
