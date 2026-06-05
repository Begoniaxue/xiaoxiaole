import { useGameStore } from '@/store/useGameStore';
import { useGameLogic } from '@/hooks/useGameLogic';
import GameBoard from '@/components/GameBoard';
import ScorePanel from '@/components/ScorePanel';
import Timer from '@/components/Timer';
import ControlPanel from '@/components/ControlPanel';
import GameOverModal from '@/components/GameOverModal';

export default function Home() {
  const { board, status } = useGameStore();
  useGameLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-float">🍎</div>
        <div className="absolute top-40 right-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '1s' }}>🍋</div>
        <div className="absolute bottom-20 left-20 text-5xl opacity-20 animate-float" style={{ animationDelay: '2s' }}>🍇</div>
        <div className="absolute bottom-40 right-10 text-6xl opacity-20 animate-float" style={{ animationDelay: '0.5s' }}>🍊</div>
        <div className="absolute top-1/2 left-5 text-4xl opacity-15 animate-float" style={{ animationDelay: '1.5s' }}>🥝</div>
      </div>

      <div className="relative z-10 w-full max-w-lg">
        <h1 className="text-4xl sm:text-5xl font-bold text-center text-white mb-6 drop-shadow-lg">
          🍉 水果消消乐 🍉
        </h1>

        {status === 'playing' && (
          <div className="flex justify-between items-center mb-4 px-2">
            <ScorePanel />
            <Timer />
          </div>
        )}

        <div className="mb-6">
          <GameBoard board={board} />
        </div>

        <ControlPanel />
      </div>

      <GameOverModal />
    </div>
  );
}
