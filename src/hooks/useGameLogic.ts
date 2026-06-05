import { useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';

export const useGameLogic = () => {
  const { status, tickTimer } = useGameStore();

  useEffect(() => {
    if (status !== 'playing') return;

    const timer = setInterval(() => {
      tickTimer();
    }, 1000);

    return () => clearInterval(timer);
  }, [status, tickTimer]);
};

export default useGameLogic;
