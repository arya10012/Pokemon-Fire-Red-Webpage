import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrainerProgress } from './components/TrainerProgress';
import { StoryTimeline } from './components/StoryTimeline';
import { StarterCards } from './components/StarterCards';
import { Pokedex } from './components/Pokedex';
import { PokemonModal } from './components/PokemonModal';
import { KantoMap } from './components/KantoMap';
import { GymBadges } from './components/GymBadges';
import { TeamRocket } from './components/TeamRocket';
import { RandomizerWidget } from './components/RandomizerWidget';
import { FeatureCards } from './components/FeatureCards';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { SecretEasterEgg } from './components/SecretEasterEgg';
import { Footer } from './components/Footer';

import { useTrainerXP } from './hooks/useTrainerXP';
import { useAudioEffects } from './hooks/useAudioEffects';
import { useKonamiCode } from './hooks/useKonamiCode';
import type { Pokemon } from './types/pokemon';

export function App() {
  const {
    state: trainerState,
    addXP,
    incrementDiscovered,
    setStarter,
    toggleDayNight,
    toggleSound,
    unlockSecretMode,
  } = useTrainerXP();

  const { playClick, playPokeballOpen, playFanfare } = useAudioEffects(trainerState.soundEnabled);

  const [searchOpen, setSearchOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [easterEggOpen, setEasterEggOpen] = useState(false);

  // Trigger Konami code listener
  useKonamiCode(() => {
    unlockSecretMode();
    setEasterEggOpen(true);
    addXP(500);
  });

  const handleSelectPokemon = (pokemon: Pokemon) => {
    setSelectedPokemon(pokemon);
    addXP(15);
    incrementDiscovered();
  };

  return (
    <div className={`min-h-screen bg-[#08090D] text-[#F5F5F5] font-sans antialiased selection:bg-[#E3350D] selection:text-white transition-colors duration-500 ${
      trainerState.dayNightMode === 'day' ? 'bg-[#0E121B]' : 'bg-[#08090D]'
    }`}>
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenSearch={() => setSearchOpen(true)}
        dayNightMode={trainerState.dayNightMode}
        onToggleDayNight={toggleDayNight}
        soundEnabled={trainerState.soundEnabled}
        onToggleSound={toggleSound}
        trainerLevel={trainerState.level}
        onPlayClick={playClick}
      />

      {/* Hero Section */}
      <Hero
        onPlayClick={playClick}
        dayNightMode={trainerState.dayNightMode}
      />

      {/* Trainer Level & Completion Widgets */}
      <TrainerProgress
        trainerState={trainerState}
        onToggleDayNight={toggleDayNight}
        onPlayClick={playClick}
      />

      {/* Story Timeline Section */}
      <StoryTimeline onPlayClick={playClick} />

      {/* Starter Pokémon Selection Section */}
      <StarterCards
        chosenStarterId={trainerState.chosenStarterId}
        onSelectStarter={(id) => {
          setStarter(id);
          addXP(100);
        }}
        onOpenModal={handleSelectPokemon}
        onPlayClick={playClick}
      />

      {/* Interactive Pokédex Dashboard Section */}
      <Pokedex
        onSelectPokemon={handleSelectPokemon}
        onPlayClick={playClick}
      />

      {/* Interactive Kanto Region Map Section */}
      <KantoMap onPlayClick={playClick} />

      {/* 8 Gym Challenge Badges Vault */}
      <GymBadges onPlayClick={playClick} />

      {/* Team Rocket Section */}
      <TeamRocket onPlayClick={playClick} />

      {/* Randomizer Widget */}
      <RandomizerWidget
        onSelectPokemon={handleSelectPokemon}
        onPlayPokeballSound={playPokeballOpen}
      />

      {/* Remastered Game Features Section */}
      <FeatureCards onPlayClick={playClick} />

      {/* Footer */}
      <Footer onPlayClick={playClick} />

      {/* Pokémon Detail Modal */}
      <PokemonModal
        pokemon={selectedPokemon}
        onClose={() => setSelectedPokemon(null)}
        onSelectPokemon={handleSelectPokemon}
        onPlayClick={playClick}
      />

      {/* Global Cmd+K Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelectPokemon={handleSelectPokemon}
        onPlayClick={playClick}
      />

      {/* Konami Easter Egg Modal */}
      <SecretEasterEgg
        isOpen={easterEggOpen}
        onClose={() => setEasterEggOpen(false)}
        onPlayFanfare={playFanfare}
      />
    </div>
  );
}

export default App;
