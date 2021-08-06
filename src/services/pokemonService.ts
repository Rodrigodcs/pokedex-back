import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemon";
import UserPokemon from "../entities/UserPokemon";



export async function getPokemons(userId:number){
    const usersPokemonsRepository = getRepository(UserPokemon)
    const pokemonsFromUser = await usersPokemonsRepository.find({userId})
    console.log("pokemonsFromUser",pokemonsFromUser)
    const pokemonRepository = getRepository(Pokemon)
    const pokemons = await pokemonRepository.find()
    console.log("pokemons",pokemons)

    const mappedPokemons = pokemons.map(p=>{
        return {
            id:p.id,
            name:p.name,
            image:p.image,
            number:p.number,
            weight:p.weight,
            height:p.height,
            baseExp:p.baseExp,
            description:p.description,
            inMyPokemons: pokemonsFromUser.find(myPokemon=>myPokemon.id===p.id)?true:false
        }
    })
    console.log("mappedPokemons",mappedPokemons)



    return pokemons
}

export async function addPokemon(userId:number,pokemonId:number){
    const usersPokemonsRepository = getRepository(UserPokemon)
    const pokemon = await usersPokemonsRepository.findOne({userId,pokemonId})
    if(!pokemon){
        await usersPokemonsRepository.insert({userId,pokemonId})
    }
    return pokemon
}

export async function removePokemon(userId:number,pokemonId:number){
    const usersPokemonsRepository = getRepository(UserPokemon)
    const pokemon = await usersPokemonsRepository.findOne({userId,pokemonId})
    if(pokemon){
        await usersPokemonsRepository.delete({userId,pokemonId})
    }
    return pokemon
}