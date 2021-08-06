import { getRepository } from "typeorm";

import Pokemon from "../../src/entities/Pokemon";

export async function createPokemon () {
  const pokemon ={
    name:"bulbasaur",
    number:"1",
    image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    weight:"69",
    height:"7",
    baseExp:64,
    description:"There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger."
  }
  const pokemonSaved = await getRepository(Pokemon).create(pokemon);
  await getRepository(Pokemon).save(pokemonSaved);
  
  return pokemonSaved
}
