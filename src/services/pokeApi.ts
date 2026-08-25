import type { Pokemon, PokemonType } from '../types/pokemon';
import { POKEMON_BY_ID, getFullKantoList } from '../data/kantoPokemon';

const cache = new Map<number | string, Pokemon>();

export const fetchPokemonDetails = async (idOrName: number | string): Promise<Pokemon> => {
  if (cache.has(idOrName)) {
    return cache.get(idOrName)!;
  }

  const numericId = typeof idOrName === 'number' ? idOrName : parseInt(idOrName, 10);
  const fallback = !isNaN(numericId) ? POKEMON_BY_ID.get(numericId) : undefined;

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${String(idOrName).toLowerCase()}`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();

    const speciesRes = await fetch(data.species.url);
    const speciesData = speciesRes.ok ? await speciesRes.json() : null;

    let description = fallback?.description || 'A mysterious Pokémon discovered in the Kanto region.';
    if (speciesData && speciesData.flavor_text_entries) {
      const redEntry = speciesData.flavor_text_entries.find(
        (e: any) => e.language.name === 'en' && (e.version.name === 'firered' || e.version.name === 'red' || e.version.name === 'ruby')
      ) || speciesData.flavor_text_entries.find((e: any) => e.language.name === 'en');
      
      if (redEntry) {
        description = redEntry.flavor_text.replace(/[\f\n\r]/g, ' ');
      }
    }

    const types: PokemonType[] = data.types.map((t: any) => t.type.name as PokemonType);

    const statsObj = {
      hp: data.stats[0]?.base_stat || 50,
      attack: data.stats[1]?.base_stat || 50,
      defense: data.stats[2]?.base_stat || 50,
      specialAttack: data.stats[3]?.base_stat || 50,
      specialDefense: data.stats[4]?.base_stat || 50,
      speed: data.stats[5]?.base_stat || 50,
      total: 0,
    };
    statsObj.total = statsObj.hp + statsObj.attack + statsObj.defense + statsObj.specialAttack + statsObj.specialDefense + statsObj.speed;

    const pokemonObj: Pokemon = {
      id: data.id,
      name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
      types,
      artwork: data.sprites.other?.['official-artwork']?.front_default || fallback?.artwork || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
      shinyArtwork: data.sprites.other?.['official-artwork']?.front_shiny || fallback?.shinyArtwork,
      animatedSprite: data.sprites.other?.showdown?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/${data.id}.gif`,
      height: data.height / 10,
      weight: data.weight / 10,
      stats: statsObj,
      description,
      category: speciesData?.genera?.find((g: any) => g.language.name === 'en')?.genus || fallback?.category || 'Pokémon',
      abilities: data.abilities.map((a: any) => (a.is_hidden ? `${a.ability.name} (Hidden)` : a.ability.name)),
      evolutionChain: fallback?.evolutionChain,
    };

    cache.set(data.id, pokemonObj);
    cache.set(data.name, pokemonObj);
    return pokemonObj;
  } catch (error) {
    console.warn(`PokéAPI fetch failed for ${idOrName}, using local Kanto fallback dataset:`, error);
    if (fallback) {
      cache.set(idOrName, fallback);
      return fallback;
    }
    const fullList = getFullKantoList();
    const found = fullList.find(p => p.id === numericId || p.name.toLowerCase() === String(idOrName).toLowerCase());
    if (found) return found;

    return fullList[0];
  }
};
