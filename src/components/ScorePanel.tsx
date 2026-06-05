import React from 'react';
import { useGameStore } from '../store/useGameStore';

const ScorePanel: React.FC = () => {
  const { score } = useGameStore();

  return (
    <div className="flex flex-col items-center bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-yellow-400/30 shadow-lg">
      <span className="text-sm font-medium text-yellow-200 uppercase tracking-wider">得分</span>
      <span className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
        {score.toLocaleString()}
      </span>
    </div>
  );
};

export default ScorePanel;
