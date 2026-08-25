export type PokemonType = 
  | 'normal' | 'fire' | 'water' | 'grass' | 'electric' 
  | 'ice' | 'fighting' | 'poison' | 'ground' | 'flying' 
  | 'psychic' | 'bug' | 'rock' | 'ghost' | 'dragon' 
  | 'steel' | 'dark' | 'fairy';

export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
}

export interface EvolutionNode {
  id: number;
  name: string;
  minLevel?: number;
  trigger?: string;
  artwork: string;
}

export interface Pokemon {
  id: number;
  name: string;
  types: PokemonType[];
  artwork: string;
  shinyArtwork?: string;
  animatedSprite?: string;
  height: number; // in decimeters or meters
  weight: number; // in hectograms or kg
  stats: PokemonStats;
  description: string;
  category: string;
  abilities: string[];
  evolutionChain?: EvolutionNode[];
}

export interface GymLeader {
  id: number;
  name: string;
  badgeName: string;
  city: string;
  type: PokemonType;
  signaturePokemon: string;
  signatureImage: string;
  quote: string;
  badgeEffect: string;
  color: string;
}

export interface LocationPoint {
  id: string;
  name: string;
  x: number; // percentage on map
  y: number; // percentage on map
  type: 'city' | 'town' | 'dungeon' | 'route' | 'landmark';
  description: string;
  wildPokemon: string[];
  landmarks: string[];
  gymLeader?: string;
}

export interface StoryChapter {
  id: string;
  number: string;
  title: string;
  location: string;
  shortDesc: string;
  fullDesc: string;
  keyEvents: string[];
  badgeReward?: string;
  bgGradient: string;
}

export interface FeatureItem {
  id: string;
  iconName: string;
  title: string;
  description: string;
  tag: string;
}

export interface TrainerState {
  level: number;
  xp: number;
  discoveredCount: number;
  chosenStarterId: number | null;
  dayNightMode: 'day' | 'night';
  secretModeUnlocked: boolean;
  soundEnabled: boolean;
}
