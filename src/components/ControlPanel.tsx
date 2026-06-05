import React from 'react';
import { useGameStore } from '../store/useGameStore';

const ControlPanel: React.FC = () => {
  const { status, startGame, resetGame } = useGameStore();

  return (
    <div className="flex flex-col items-center gap-4">
      {status === 'idle' && (
        <>
          <button
            onClick={startGame}
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 
                       text-white text-xl font-bold rounded-2xl
                       shadow-lg hover:shadow-xl
                       transform hover:scale-105 active:scale-95
                       transition-all duration-200
                       border-2 border-white/30
                       backdrop-blur-sm"
          >
            🎮 开始游戏
          </button>
          <div className="text-center text-white/70 text-sm max-w-xs">
            <p className="mb-2">📌 <strong>游戏规则</strong></p>
            <p>• 点击相邻水果互换位置</p>
            <p>• 横竖连成3个及以上相同水果自动消除</p>
            <p>• 60秒内尽可能获得高分</p>
            <p>• 互换无法消除会自动撤回</p>
          </div>
        </>
      )}

      {status === 'playing' && (
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 
                     text-white text-lg font-bold rounded-xl
                     shadow-md hover:shadow-lg
                     transform hover:scale-105 active:scale-95
                     transition-all duration-200
                     border border-white/20"
        >
          🔄 重新开始
        </button>
      )}

      {status === 'gameover' && (
        <button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 
                     text-white text-xl font-bold rounded-2xl
                     shadow-lg hover:shadow-xl
                     transform hover:scale-105 active:scale-95
                     transition-all duration-200
                     border-2 border-white/30"
        >
          🎉 再玩一次
        </button>
      )}
    </div>
  );
};

export default ControlPanel;
