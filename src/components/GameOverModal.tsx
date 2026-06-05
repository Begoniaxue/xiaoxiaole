import React from 'react';
import { useGameStore } from '../store/useGameStore';

const GameOverModal: React.FC = () => {
  const { status, score, startGame } = useGameStore();

  if (status !== 'gameover') return null;

  const getRank = (score: number): { emoji: string; text: string; color: string } => {
    if (score >= 500) return { emoji: '🏆', text: '水果大师', color: 'text-yellow-400' };
    if (score >= 300) return { emoji: '🥇', text: '消除达人', color: 'text-orange-400' };
    if (score >= 150) return { emoji: '🥈', text: '益智高手', color: 'text-gray-300' };
    if (score >= 50) return { emoji: '🥉', text: '初级玩家', color: 'text-amber-600' };
    return { emoji: '🍎', text: '新手入门', color: 'text-green-400' };
  };

  const rank = getRank(score);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-white/20 transform animate-bounce-in">
        <div className="text-center">
          <div className="text-6xl mb-4">{rank.emoji}</div>
          <h2 className="text-3xl font-bold text-white mb-2">游戏结束!</h2>
          <p className={`text-xl font-semibold mb-4 ${rank.color}`}>{rank.text}</p>
          
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-6">
            <p className="text-white/70 text-sm mb-1">最终得分</p>
            <p className="text-5xl font-bold text-white drop-shadow-lg">
              {score.toLocaleString()}
            </p>
          </div>

          <button
            onClick={startGame}
            className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500
                       text-white text-xl font-bold rounded-xl
                       shadow-lg hover:shadow-xl
                       transform hover:scale-105 active:scale-95
                       transition-all duration-200
                       border-2 border-white/30"
          >
            🎮 再来一局
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;
