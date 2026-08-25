import { useState, useEffect, useCallback } from 'react';
import type { TrainerState } from '../types/pokemon';

const STORAGE_KEY = 'pokemon_firered_trainer_state';

const defaultState: TrainerState = {
  level: 25,
  xp: 450,
  discoveredCount: 108,
  chosenStarterId: 4, // Default Charmander
  dayNightMode: 'night',
  secretModeUnlocked: false,
  soundEnabled: true,
};

export const useTrainerXP = () => {
  const [state, setState] = useState<TrainerState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore localStorage errors
    }
    return defaultState;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore
    }
  }, [state]);

  const addXP = useCallback((amount: number) => {
    setState((prev) => {
      const newXp = prev.xp + amount;
      const xpNeeded = prev.level * 50;
      let newLevel = prev.level;

      if (newXp >= xpNeeded) {
        newLevel += 1;
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });
  }, []);

  const incrementDiscovered = useCallback(() => {
    setState((prev) => ({
      ...prev,
      discoveredCount: Math.min(151, prev.discoveredCount + 1),
    }));
  }, []);

  const setStarter = useCallback((starterId: number) => {
    setState((prev) => ({ ...prev, chosenStarterId: starterId }));
  }, []);

  const toggleDayNight = useCallback(() => {
    setState((prev) => ({
      ...prev,
      dayNightMode: prev.dayNightMode === 'day' ? 'night' : 'day',
    }));
  }, []);

  const toggleSound = useCallback(() => {
    setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  }, []);

  const unlockSecretMode = useCallback(() => {
    setState((prev) => ({ ...prev, secretModeUnlocked: true }));
  }, []);

  return {
    state,
    addXP,
    incrementDiscovered,
    setStarter,
    toggleDayNight,
    toggleSound,
    unlockSecretMode,
  };
};
